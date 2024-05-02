const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
const { format } = require('date-fns')
const { randomUUID } = require('crypto')

const evenLogger = async (event, fileName) => {
  const eventDate = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')
  const eventContent = `${eventDate}\t${randomUUID()}\t${event}\n`
  if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
    fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
  }

  try {
    fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', fileName),
      eventContent
    )
  } catch (error) {
    console.log(error)
  }
}

const logger = (req, res, next) => {
  evenLogger(`${req.url}\t${req.method}\t${req.headers.origin}`, 'event.log')
  next()
}

module.exports = { logger, evenLogger }
