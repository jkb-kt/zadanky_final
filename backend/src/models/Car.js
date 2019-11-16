/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines car database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 25
    },
    spz: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 8
    },
    color: {
      type: String,
      required: true
    },
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

export default mongoose.model('car', carSchema)
