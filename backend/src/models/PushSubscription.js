/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines push subscription database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const pushSubscriptionSchema = new Schema(
  {
    authId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'auth'
    },
    endpoint: {
      type: String,
      required: true
    },
    expirationTime: {
      type: String,
      required: false
    },
    keys: {
      auth: {
        type: String,
        required: true
      },
      p256dh: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
)

export default mongoose.model('pushSubscription', pushSubscriptionSchema)
