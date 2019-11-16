/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines authorization database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      max: 15,
      default: ''
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roles: [
      {
        type: String,
        required: false
      }
    ],
    approved: {
      type: Boolean,
      required: true,
      default: false
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'auth'
    }
  },
  { timestamps: true }
)

export default mongoose.model('auth', authSchema)
