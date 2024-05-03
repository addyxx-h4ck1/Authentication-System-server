const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500 //internal server error
  res.status(status)
  res.sendStatus(500)
  console.log(err.stack)
}

module.exports = { errorHandler }
