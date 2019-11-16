/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles authorization and authentication logic
*/

import sgMail from '@sendgrid/mail'
import { AuthenticationError } from 'apollo-server-core'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { ErrorCodes } from '../../constants'
import Auth from '../../models/Auth'
import ResetPassword from '../../models/ResetPassword'
import { hasRights, validateInput } from '../../utils'
import { authSchema, newPasswordSchema, registerSchema } from '../../validation'

export default {
  Query: {
    isMe: async (parent, args, { req }, info) => {
      if (req.session.authId) {
        const auth = await Auth.findOne({ _id: req.session.authId })
        return auth._doc
      }
      return null
    },
    auths: async (parent, { offset, limit }, { req }, info) => {
      await hasRights(req, ['admin'])
      const auths = await Auth.find({ roles: { $ne: 'admin' } })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)

      return auths.map(auth => {
        return {
          ...auth._doc,
          createdAt: auth.createdAt.toISOString()
        }
      })
    },
    authsExport: async (parent, args, { req }, info) => {
      await hasRights(req, ['approver'])
      const auths = await Auth.find({ roles: { $ne: 'admin' }, name: { $ne: '' } }).sort({
        createdAt: -1
      })

      return auths.map(auth => {
        return {
          ...auth._doc,
          createdAt: auth.createdAt.toISOString()
        }
      })
    },
    auth: async (parent, { _id }, { req }, info) => {
      await hasRights(req, ['admin'])
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Not an ObjectId')
      }
      const auth = await Auth.findOne({ _id }).populate(['updatedBy'])
      return {
        ...auth._doc,
        createdAt: auth.createdAt.toISOString(),
        updatedAt: auth.updatedAt.toISOString()
      }
    },
    authsCount: async (parent, args, { req }, info) => {
      const count = await Auth.countDocuments()
      return count
    }
  },
  Mutation: {
    register: async (parent, { registerInput: { email, password } }, info) => {
      validateInput({ email, password }, registerSchema)
      const existingAuth = await Auth.findOne({ email: email.toLowerCase() })
      if (existingAuth) {
        throw new Error(ErrorCodes.AUTH_EXISTS)
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const auth = new Auth({ email: email.toLowerCase(), password: hashedPassword })
      await auth.save()

      const msgForAdmin = {
        from:
          process.env.NODE_ENV === 'development'
            ? process.env.GMAIL_USER_DEV
            : process.env.GMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `Registrace nového přístupového účtu ${email} do žádanek o přepravu`,
        html: `<p>Pro jeho aktivaci a další nastavení pokračujte kliknutím na odkaz níže.</p>
        <a href="${process.env.FRONTEND_ORIGIN}/auth/${auth._id}" target="_blank">Detail nového přístupového účtu ${email}</a>`
      }

      const msgForUser = {
        from:
          process.env.NODE_ENV === 'development'
            ? process.env.GMAIL_USER_DEV
            : process.env.GMAIL_USER,
        to: email,
        subject: `Úspěšná registrace do systému žádanek o přepravu`,
        html: `<p>Vaše registrace do systému žádanek o přepravu proběhla úspěšně. 
          Vyčkejte, prosím, schválení účtu administrátorem. Po schválení účtu budete informováni emailem.</p>`
      }

      try {
        sgMail.send(msgForAdmin)
        sgMail.send(msgForUser)
        return auth
      } catch (err) {
        console.log(err)
        throw Error('Error sending email')
      }
    },
    login: async (parent, { loginInput: { email, password } }, { req }, info) => {
      const auth = await Auth.findOne({ email })
      if (!auth) {
        throw new AuthenticationError(ErrorCodes.UNAUTHENTICATED)
      }

      const isValid = await bcrypt.compare(password, auth.password)

      if (!isValid) {
        throw new AuthenticationError(ErrorCodes.UNAUTHENTICATED)
      }

      if (!auth.approved) {
        throw new AuthenticationError(ErrorCodes.AUTH_NOT_ACTIVATED)
      }

      req.session.authId = auth._id

      return auth._doc
    },
    logout: async (parent, args, { req }, info) => {
      req.session.authId = null
      return true
    },
    resetPassword: async (parent, { email }, info) => {
      const auth = await Auth.findOne({ email })
      if (!auth) {
        throw new Error(ErrorCodes.AUTH_DOESNT_EXIST)
      }

      const token = crypto.randomBytes(32).toString('hex')
      const hashedToken = await bcrypt.hash(token, 12)
      await ResetPassword.findOneAndUpdate(
        { authId: auth._id },
        { token: hashedToken, expiration: new Date().setHours(new Date().getHours() + 1) },
        { upsert: true }
      )

      const msg = {
        to: email,
        from:
          process.env.NODE_ENV === 'development'
            ? process.env.GMAIL_USER_DEV
            : process.env.GMAIL_USER,
        subject: 'Obnova hesla do žádanek o přepravu',
        html: `<p>Pro obnovu hesla pokračujte kliknutím na odkaz níže.</p>
        <a href="${process.env.FRONTEND_ORIGIN}/password-reset/${auth._id}/${token}" target="_blank">Obnovit heslo</a>`
      }

      try {
        sgMail.send(msg)
        return true
      } catch (err) {
        console.log(err)
        throw Error('Error sending email')
      }
    },
    newPassword: async (parent, { authId, resetToken, password }, context, info) => {
      validateInput({ password }, newPasswordSchema)
      const auth = await ResetPassword.findOne({ authId })

      if (!auth) {
        throw new Error()
      }

      const isValid = bcrypt.compare(resetToken, auth.token)

      if (!isValid) {
        throw new AuthenticationError('wrong token')
      }

      if (new Date() > auth.expiration) {
        throw new Error(ErrorCodes.TOKEN_EXPIRED)
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      await Auth.findByIdAndUpdate({ _id: authId }, { password: hashedPassword })

      return true
    },
    updateAuth: async (parent, { _id, authInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      validateInput({ roles: authInput.roles, name: authInput.name }, authSchema)
      const prevAuth = await Auth.findById(_id)
      const result = await Auth.findByIdAndUpdate(
        _id,
        {
          ...authInput,
          updatedBy: req.session.authId
        },
        { new: true }
      )

      if (!prevAuth.approved && authInput.approved) {
        const msg = {
          to: prevAuth.email,
          from:
            process.env.NODE_ENV === 'development'
              ? process.env.GMAIL_USER_DEV
              : process.env.GMAIL_USER,
          subject: 'Schválení účtu v systému žádanek o přepravu',
          html: `<p>Váš účet v systému žádanek o přepravu byl schválen administrátorem. 
            Nyní se můžete přihlásit <a href="${process.env.FRONTEND_ORIGIN}" target="_blank">zde.</a></p>`
        }
        try {
          sgMail.send(msg)
        } catch (err) {
          console.log(err)
          throw Error('Error sending email')
        }
      }
      return result._doc
    }
  }
}
