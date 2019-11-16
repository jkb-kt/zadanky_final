/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Handles push subscription connected logic
*/

import mongoose from 'mongoose'
import PushSubscription from '../../models/PushSubscription'
import { hasRights } from '../../utils'

export default {
  Mutation: {
    pushRegister: async (parent, { pushSubscriptionInput, authId }, { req }, info) => {
      await hasRights(req, ['driver', 'approver', 'requestant'])
      if (!mongoose.Types.ObjectId.isValid(authId)) {
        throw new Error('Not an ObjectId')
      }

      const subscription = new PushSubscription({
        authId,
        ...pushSubscriptionInput
      })
      await subscription.save()
      return true
    },
    pushUnregister: async (parent, { pushSubscriptionInput }, { req }, info) => {
      await hasRights(req, ['driver', 'approver', 'requestant'])
      await PushSubscription.findOneAndDelete({
        endpoint: pushSubscriptionInput.endpoint
      })
      return true
    }
  }
}
