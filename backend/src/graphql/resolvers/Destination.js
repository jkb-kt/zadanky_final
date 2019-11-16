/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles destination connected logic
*/

import Destination from '../../models/Destination'
import { hasRights, validateInput } from '../../utils'
import { destinationSchema } from '../../validation'

export default {
  Query: {
    destinations: async (parent, args, { req }, info) => {
      await hasRights(req, ['admin', 'requestant', 'approver', 'driver'])
      const destinations = await Destination.find().sort({ name: 1 })
      return destinations.map(destination => {
        return destination._doc
      })
    }
  },
  Mutation: {
    createDestination: async (parent, { destinationInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      validateInput(destinationInput, destinationSchema)
      const destination = new Destination(destinationInput)
      const result = await destination.save()
      return result._doc
    },
    updateDestination: async (parent, { _id, destinationInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      const result = await Destination.findByIdAndUpdate(_id, destinationInput)
      return result._doc
    }
  }
}
