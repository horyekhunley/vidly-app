const express = require("express");
const auth = require("../middleware/auth");
require('dotenv').config()
const { Rental, validate } = require("../models/rental_model");
const { Movie } = require("../models/movie_model");
const { Customer } = require("../models/customer_model");
const router = express.Router();

//get all rentals sorting by title
router.get("/", async (req, res) => {
	const rentals = await Rental.find().sort("-dateOut");
	res.send(rentals);
});
// create a new movie rental
router.post("/",auth,  async (req, res) => {
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

	movie.numberInStock--
	movie.save()

	res.send(rental);	
});

router.put("/:id", auth, async (req, res) => {
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
router.delete("/:id", auth, async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findByIdAndRemove(req.params.id);

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

	res.send(movie);
});
router.get("/:id", auth, async(req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findById(req.params.id);

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

	res.send(movie);
});

module.exports = router;
