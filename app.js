require("winston-mongodb")
const express = require("express")
require("express-async-errors")
const Joi = require("joi")
const cors = require("cors")
Joi.objectId = require("joi-objectid")(Joi)
require("dotenv").config()
const { pinoLogger } = require("./logger/logger")

const app = express()

process.on("uncaughtException", (err) => {
  pinoLogger.error("We caught an uncaught exception")
  pinoLogger.error(err.message, err)
})
const { dbConnection } = require("./db/db")
const genreRouter = require("./routes/genre.routes")
const customerRouter = require("./routes/customers.routes")
const movieRouter = require("./routes/movies.routes")
const rentalRouter = require("./routes/rentals.routes")
const userRouter = require("./routes/user.routes")
const errorMiddleware = require("./middleware/error.middleware")

dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/v1/genre", genreRouter)
app.use("/api/v1/customers", customerRouter)
app.use("/api/v1/movies", movieRouter)
app.use("/api/v1/rentals", rentalRouter)
app.use("/api/v1/users", userRouter)

// error handler
app.use(errorMiddleware)

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  pinoLogger.info(`Server running on http://localhost:${port}`)
})

module.exports = server