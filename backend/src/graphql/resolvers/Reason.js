/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles reason connected logic
*/

import Reason from '../../models/Reason'
import { hasRights, validateInput } from '../../utils'
import { reasonSchema } from '../../validation'

export default {
  Query: {
    reasons: async (parent, args, { req }, info) => {
      await hasRights(req, ['admin', 'requestant', 'approver', 'driver'])
      const reasons = await Reason.find().sort({ name: 1 })
      return reasons.map(reason => {
        return reason._doc
      })
    }
  },
  Mutation: {
    createReason: async (parent, { reasonInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      validateInput(reasonInput, reasonSchema)
      const reason = new Reason(reasonInput)
      const result = await reason.save()
      return result._doc
    },
    updateReason: async (parent, { _id, reasonInput }, { req }, info) => {
      await hasRights(req, ['admin'])
      const result = await Reason.findByIdAndUpdate(_id, reasonInput)
      return result._doc
    }
  }
}
