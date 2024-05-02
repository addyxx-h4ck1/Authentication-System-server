const usersDB = require('../db/users.json')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req, res) => {
  //get the cookie
  const cookie = req.cookies
  //check for cookie
  if (!cookie?.jwt) return res.status(401).json()
  //create token
  const token = cookie.jwt
  //get user with token
  const existUser = usersDB.find((el) => el.refreshToken === token)
  //check if user exist
  if (!existUser) return res.status(400).json()
  //verify & create a new Token
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err) return res.status(403).json()
    const accessToken = jwt.sign(
      { username: existUser.user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    res.status(200).json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
