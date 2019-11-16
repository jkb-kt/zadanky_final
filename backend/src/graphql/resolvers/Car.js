/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles car connected logic
*/

import mongoose from 'mongoose'
import Car from '../../models/Car'
import { hasRights, validateInput } from '../../utils'
import { carSchema } from '../../validation'

export default {
  Query: {
    cars: async (parent, { limit, offset }, { req }, info) => {
      await hasRights(req, ['admin', 'requestant', 'approver', 'driver'])
      const cars = await Car.find()
        .sort({ name: 1 })
        .skip(offset)
        .limit(limit)
      return cars.map(car => {
        return {
          ...car._doc,
          createdAt: car.createdAt.toISOString(),
          updatedAt: car.updatedAt.toISOString()
        }
      })
    },
    car: async (parent, { _id }, { req }, info) => {
      await hasRights(req, ['admin'])
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Not an ObjectId')
      }
      const car = await Car.findOne({ _id }).populate(['updatedBy', 'author'])
      return {
        ...car._doc,
        createdAt: car.createdAt.toISOString(),
        updatedAt: car.updatedAt.toISOString()
      }
    },
    carsCount: async (parent, args, { req }, info) => {
      await hasRights(req, ['admin'])
      const count = await Car.countDocuments()
      return count
    }
  },
  Mutation: {
    createCar: async (parent, { carInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      validateInput(carInput, carSchema)
      const car = new Car({ ...carInput, author: req.session.authId, active: true })
      const result = await car.save()
      return result._doc
    },
    updateCar: async (parent, { _id, carInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      const result = await Car.findByIdAndUpdate(_id, {
        ...carInput,
        updatedBy: req.session.authId
      })
      return result._doc
    }
  }
}
