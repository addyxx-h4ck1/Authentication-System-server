require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization']
  //check if auth exist
  if (!authHeader) return res.status(401).json()
  //get token
  const token = authHeader.split(' ')[1]
  //verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json()
    req.user = decoded
    next()
  })
}

module.exports = { verifyJWT }
