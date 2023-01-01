const mongoose = require('mongoose')
const { pinoLogger } = require('../logger/logger')

exports.dbConnection = () => {
    const db = process.env.MONGO_TEST_URI
    try {
        mongoose.set('strictQuery', false)

      mongoose.connect(db)
            .then(() => pinoLogger.info(`Connected to ${db}`))
            .catch(err => pinoLogger.error('MongoDB error', err))

    } catch (error) {
        pinoLogger.error('Something went wrong', error)
    }

}