const UsersDB = require('../models/usersSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = async (req, res) => {
  //get the cookie
  const cookie = req.cookies
  //check for cookie
  if (!cookie?.jwt) return res.sendStatus(401)
  //create token
  const token = cookie.jwt
  //get user with token
  const existUser = await UsersDB.findOne({ refreshToken: token })
  //check if user exist
  if (!existUser)
    return res.status(400).json({ ok: false, msg: 'invalid token' })
  //verify & create a new Token
  let newUserID = existUser._id.toString()
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err) return res.status(403).json()
    const accessToken = jwt.sign(
      { userID: newUserID },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    res.status(200).json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
