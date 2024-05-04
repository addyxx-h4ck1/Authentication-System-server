const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersDB = require('../models/usersSchema')
require('dotenv').config()

const handleLogin = async (req, res) => {
  const { user, password } = req.body
  // check for credentials
  if (!user || !password)
    return res.status(400).json({ ok: false, err: 'provide all credentials' })
  try {
    //check if user exist
    let existUser = await UsersDB.findOne({ user: user })
    if (!existUser)
      return res.status(404).json({ ok: false, err: 'user not found' })
    //validate pwd
    const userValidation = await bcrypt.compare(password, existUser.pwd)
    if (!userValidation)
      return res.status(401).json({ ok: false, err: 'invalid credentials' })
    // //sign Tokens
    let newUserID = existUser._id.toString()
    const accessToken = jwt.sign(
      { userID: newUserID },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    const refreshToken = jwt.sign(
      { userID: newUserID },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    //save Refresh Token to DB
    await UsersDB.findByIdAndUpdate(newUserID, { refreshToken: refreshToken })
    //send accessToken To Client
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(201).json({ ID: newUserID, accessToken })
    return
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'internal server error' })
    console.log(error)
  }
}

module.exports = { handleLogin }
