const path = require("path")
const fs = require("fs")
const fsPromises = require("fs").promises
const bcrypt = require("bcrypt")
const usersFile = require("../db/users.json")

const createUser = async (req, res) => {
  const { user, pwd } = req.body
  //check for credentials
  if (!user || !pwd)
    return res.status(409).json({ ok: false, err: "missing credentials" })
  //check if user exist
  let userExist = usersFile.find((el) => el.user === user)
  if (userExist)
    return res.status(409).json({ ok: false, err: "user already exist" })
  //hash pwd
  const hashedPwd = await bcrypt.hash(pwd, 10)
  const newData = JSON.stringify([...usersFile, { user, hashedPwd }])
  //save user to DB
  try {
    fsPromises.writeFile(
      path.join(__dirname, "..", "db", "users.json"),
      newData
    )

    res.status(201).json({ ok: true, msg: "new user created" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createUser }
