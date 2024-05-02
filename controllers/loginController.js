const usersDB = require('../db/users.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const path = require('path')
const fsPromises = require('fs').promises

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  // check for credentials
  if (!user || !pwd)
    return res.status(409).json({ ok: false, err: 'missing credentials' })
  //check if user exist
  let existUser = usersDB.find((el) => el.user === user)
  if (!existUser)
    return res.status(404).json({ ok: false, err: 'user not found' })
  //validate pwd
  const userValidation = await bcrypt.compare(pwd, existUser.hashedPwd)
  if (!userValidation) {
    return res.status(401).json({ ok: false, err: 'invalid credentials' })
  } else {
    //sign Tokens
    const accessToken = jwt.sign(
      { username: existUser.user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    const refreshToken = jwt.sign(
      { username: existUser.user },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    //save token to DB
    const otherUsers = usersDB.filter((el) => el.user !== existUser.user)
    let currentUser = { ...existUser, refreshToken }
    const newUsersDB = JSON.stringify([...otherUsers, currentUser])
    try {
      await fsPromises.writeFile(
        path.join(__dirname, '..', 'db', 'users.json'),
        newUsersDB
      )
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      res.status(200).json({ accessToken })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = { handleLogin }
