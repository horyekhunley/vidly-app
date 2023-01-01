const pino = require("pino")
require('winston-mongodb')
const winston = require('winston')
require('express-async-errors')

const pinoLogger = pino({
  base: { pid: false },
  transport: {
    target: "pino-pretty",
    options: {
      colorized: true,
    },
  },
  timestamp: () => `,"time": "${new Date().toLocaleString()}"`,
})

//winston.add(winston.transports.File, { filename: logfile.log })
//winston.add(new winston.transports.MongoDB, {
//    db: 'mongodb://localhost/vidly_api',
//    level: 'info'
//})

module.exports = {
  pinoLogger,
}
