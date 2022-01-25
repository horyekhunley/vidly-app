const express = require("express");
const { Movie, validate } = require("../models/movie_model");
const { Genre } = require('../models/genre_model')
const router = express.Router();

//get all movies sorting by title
router.get("/", async (req, res) => {
	const movies = await Movie.find().sort("title");
	res.send(movies);
});

router.post("/", async(req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(400).send('Invalid genre')

	let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
   });
	movie = await movie.save();

	res.send(movie);
});

router.put("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.title }, { new: true })

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

    res.send(movie)
});
router.delete("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findByIdAndRemove(req.params.id,);

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

    res.send(movie)
});
router.get("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = await Movie.findById(req.params.id,);

	if (!movie)
		return res.status(404).send("The movie with the given id was not found");

    res.send(movie)
})

module.exports = router