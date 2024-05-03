require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { logger } = require('./middleware/logger')
const { errorHandler } = require('./middleware/errorHandler')
const { corsOptions } = require('./config/corsOptions')
const SignupRouter = require('./routes/newUser')
const loginRouter = require('./routes/login')
const dashboardRouter = require('./routes/dashboard')
const refreshTokenRouter = require('./routes/refresh')
const app = express()
const UsersDB = require('./models/usersSchema')
const { connect } = require('./db/conn')
//port
const port = process.env.PORT || 3000

//middleware
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/api/v1/signup', SignupRouter)
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/refresh-token', refreshTokenRouter)
app.use('/dashboard', dashboardRouter)

//test route (To be deleted)
app.get('/api/users', async (req, res) => {
  const allUsers = await UsersDB.find()
  res.status(200).json(allUsers)
})
//test route (to be deleted)

//start server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to mongoDB.......')
    app.listen(port, () => console.log(`server is running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

app.use(errorHandler)
start()
