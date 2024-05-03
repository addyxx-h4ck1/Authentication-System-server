const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true,
    },
    pwd: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  { timeStamps: true }
)

module.exports = mongoose.model('User', userSchema)
