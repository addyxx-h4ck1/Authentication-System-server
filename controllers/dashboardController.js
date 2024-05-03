const UsersDB = require('../models/usersSchema')

const handleDashboard = async (req, res) => {
  //get verified User
  const { userID } = req.user
  if (!userID) return res.sendStatus(401)
  //access users resources
  const userData = await UsersDB.findById(userID)
  res.status(200).json({ userData })
}

module.exports = { handleDashboard }
