const express = require('express')
const userRegistration = require('../routes/user_registration')
const genreRoute = require('../routes/genre_route')
const customerRoute = require('../routes/customer_route')
const movieRoute = require('../routes/movie_route')
const rentalRoute = require('../routes/rental_route')
const userLogin = require('../routes/user_login')
const auth = require('../middleware/auth')
const errorHandler = require('../middleware/error_handler')

module.exports = function (app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use("/api/users/", userRegistration);
	app.use("/api/users/", userLogin);
	app.use("/api/genres/", genreRoute);
	app.use("/api/customers/", customerRoute);
	app.use("/api/movies/", movieRoute);
	app.use("/api/rentals/", rentalRoute);
  app.use(errorHandler)
};
