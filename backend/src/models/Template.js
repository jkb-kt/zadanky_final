/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines template database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const templateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    driver: {
      type: Schema.Types.ObjectId,
      required: false
    },
    approver: {
      type: Schema.Types.ObjectId,
      required: false
    },
    passengers: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'user'
      }
    ],
    reasons: [
      {
        type: Schema.Types.ObjectId,
        required: false
      }
    ],
    destinations: [
      {
        type: Schema.Types.ObjectId,
        required: false
      }
    ],
    car: {
      type: Schema.Types.ObjectId,
      required: false
    },
    note: {
      type: String,
      required: false,
      maxlength: 250
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

export default mongoose.model('template', templateSchema)
