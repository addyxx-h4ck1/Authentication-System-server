const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { logger } = require('./middleware/logger')
const SignupRouter = require('./routes/newUser')
const loginRouter = require('./routes/login')
const dashboardRouter = require('./routes/dashboard')
const refreshTokenRouter = require('./routes/refresh')
const app = express()
//port
const port = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(logger)
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/api/v1/signup', SignupRouter)
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/refresh-token', refreshTokenRouter)
app.use('/dashboard', dashboardRouter)

//test route (To be deleted)
app.get('/api/users', (req, res) => {
  const data = [
    {
      name: 'brian',
      role: 'font-end engineer',
    },
    {
      name: 'Mike',
      role: 'fullstack engineer',
    },
    {
      name: 'John',
      role: 'data scientist',
    },
  ]
  res.status(200).json({ ok: true, data: data })
})
//test route (to be deleted)

//start server
app.listen(port, () => console.log(`server is running on port ${port}`))
