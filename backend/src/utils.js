import { AuthenticationError, ForbiddenError, ValidationError } from 'apollo-server-core'
import Joi from 'joi'
import mongoose from 'mongoose'
import { ErrorCodes } from './constants'
import Auth from './models/Auth'

// Converts all MongoDB ObjectIds to String
const { ObjectId } = mongoose.Types
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

export const hasRights = async (req, allowedRoles) => {
  if (!req.session.authId) {
    throw new AuthenticationError(ErrorCodes.UNAUTHENTICATED)
  }

  const user = await Auth.findOne({ _id: req.session.authId }).select('roles')
  if (!user.roles.some(role => allowedRoles.includes(role))) {
    throw new ForbiddenError(ErrorCodes.UNAUTHORIZED)
  }
}

export const validateInput = (input, schema) => {
  const { error, value } = Joi.validate(input, schema)
  if (error) {
    throw new ValidationError(ErrorCodes.VALIDATION_ERROR)
  }
}

export const handleValuesNotInMongo = async (originalArray, Model, newArray) => {
  await Promise.all(
    originalArray.map(async item => {
      if (!mongoose.Types.ObjectId.isValid(item)) {
        const newItem = new Model({ name: item })
        const savedItem = await newItem.save()
        newArray.push(savedItem._id)
        originalArray.splice(originalArray.indexOf(item), 1)
      }
    })
  )
}
