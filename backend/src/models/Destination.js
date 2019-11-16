/* 
  Author: Jakub Kot
  Licence: MIT
  File description: Defines destination database model
*/

import mongoose from 'mongoose'
const { Schema } = mongoose

const destinationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 25
    }
  },
  { timestamps: false }
)

export default mongoose.model('destination', destinationSchema)
