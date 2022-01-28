const mongoose = require('mongoose')
require('dotenv').config()

module.exports = () => {
	const db = process.env.MONGOOSE_URI_JEST
	mongoose
		.connect(db, {
			useNewUrlParser: true,
		})
		.then(() => {
			console.log(`Connected to ${db}`)
		})
};
