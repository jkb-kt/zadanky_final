/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines reason database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const reasonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 25
    }
  },
  { timestamps: false }
)

export default mongoose.model('reason', reasonSchema)
