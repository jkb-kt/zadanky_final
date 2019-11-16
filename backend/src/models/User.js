/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines user database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 15
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 15
    },
    roles: [
      {
        type: String,
        required: true
      }
    ],
    active: {
      type: Boolean,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'auth'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'auth'
    }
  },
  { timestamps: true }
)

export default mongoose.model('user', userSchema)
