const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  credit: {
    type: Number,
    default: 0
  }
})

mongoose.model('users', userSchema)
