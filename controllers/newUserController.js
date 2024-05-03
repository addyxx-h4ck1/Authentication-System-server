const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')
const UsersDB = require('../models/usersSchema')

const createUser = async (req, res) => {
  const { user, password } = req.body
  //check for empty values
  if (!user || !password)
    return res
      .status(400)
      .json({ ok: false, msg: 'server cant store empty values' })
  try {
    // check if user exist in DB
    let existUser = await UsersDB.findOne({ user: user })
    if (existUser)
      return res.status(409).json({ ok: false, msg: 'User already exist' })
    //hash the password
    let pwd = await bcrypt.hash(password, 10)
    //store user in DB
    await UsersDB.create({ user, pwd })
    res.status(201).json({ ok: true, msg: 'User was created' })
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'internal server error' })
    console.log(error)
  }
}

module.exports = { createUser }
