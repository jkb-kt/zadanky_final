/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines requisition database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const requisitionSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      default: 'unapproved'
    },
    driver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    approver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    passengers: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
      }
    ],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    reasons: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'reason'
      }
    ],
    destinations: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'destination'
      }
    ],
    car: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'car'
    },
    number: {
      type: Number,
      required: false,
      default: null
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

export default mongoose.model('requisition', requisitionSchema)
