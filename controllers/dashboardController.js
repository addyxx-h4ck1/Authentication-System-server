const usersDB = require('../db/users.json')

const handleDashboard = (req, res) => {
  //get verified User
  const { username } = req.user
  if (!username) return res.status(403).json()
  //access users resources
  let usersResources = usersDB.filter((el) => el.user === username)
  res.status(200).json(usersResources)
}

module.exports = { handleDashboard }
