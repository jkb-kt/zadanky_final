/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles user connected logic
*/

import mongoose from 'mongoose'
import User from '../../models/User'
import { hasRights, validateInput } from '../../utils'
import { userSchema } from '../../validation'

export default {
  Query: {
    users: async (parent, { limit, offset, type }, { req }, info) => {
      await hasRights(req, ['admin', 'requestant', 'approver', 'driver'])
      const users = await User.find({ roles: type ? { $all: [type] } : { $exists: true } })
        .sort({ lastName: 1 })
        .skip(offset)
        .limit(limit)
      return users.map(user => {
        return {
          ...user._doc,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString()
        }
      })
    },
    user: async (parent, { _id }, { req }, info) => {
      await hasRights(req, ['admin'])
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Not an ObjectId')
      }
      const user = await User.findOne({ _id }).populate(['updatedBy', 'author'])
      return {
        ...user._doc,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    },
    usersCount: async (parent, args, { req }, info) => {
      const count = await User.countDocuments()
      return count
    }
  },
  Mutation: {
    createUser: async (parent, { userInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      validateInput(userInput, userSchema)
      const user = new User({ ...userInput, author: req.session.authId, active: true })
      const result = await user.save()
      return result._doc
    },
    updateUser: async (parent, { _id, userInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      const result = await User.findByIdAndUpdate(_id, {
        ...userInput,
        updatedBy: req.session.authId
      })
      return result._doc
    }
  }
}
