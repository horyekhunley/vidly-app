const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Rental, validate, Rental } = require("../models/rental_model");
const { Movie } = require("../models/movie_model");
const { Customer } = require("../models/customer_model");
const router = express.Router();

Fawn.init(mongoose);

//get all rentals sorting by title
router.get("/", async (req, res) => {
	const rentals = await Rental.find().sort("-dateOut");
	res.send(rentals);
});
// create a new movie rental
router.post("/", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send("Invalid customer");

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send("Invalid movie");

	if (movie.numberInStock === 0)
		return res.status(400).send("The movie you requested is not in stock");

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate,
		},
	});

	try {
		new Fawn.Task()
			.save("rentals", rental)
			.update(
				"movies",
				{ _id: movie._id },
				{
					$inc: { numberInStock: -1 },
				}
			)
			.run();

		res.send(rental);
	} catch (ex) {
		res.status(500).send("Something failed");
	}
});

router.put("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.title },
		{ new: true }
	);

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

	res.send(movie);
});
router.delete("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findByIdAndRemove(req.params.id);

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

	res.send(movie);
});
router.get("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findById(req.params.id);

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

	res.send(movie);
});

module.exports = router;
