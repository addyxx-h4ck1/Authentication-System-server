const mongoose = require('mongoose')

const connect = async (URI, callback) => {
  try {
    await mongoose.connect(URI)
  } catch (error) {
    console.log(error)
  }
}
module.exports = { connect }
