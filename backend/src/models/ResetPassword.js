/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines reset password database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const resetPasswordSchema = new Schema(
  {
    authId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'auth'
    },
    token: {
      type: String,
      required: true
    },
    expiration: {
      type: Date,
      required: true
    }
  },
  { timestamps: false }
)

export default mongoose.model('resetPassword', resetPasswordSchema)
