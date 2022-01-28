const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre_model");
const router = express.Router();

router.get("/", async (req, res) => {
	throw new Error("Cannot get all genres");
	const genres = await Genre.find().sort("name").select("-__v");
	res.send(genres);
});
router.post("/", auth, async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let genre = new Genre({ ...req.body });
	genre = await genre.save();

	res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

	res.send(genre);
});
router.delete("/:id", [auth, admin], async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

	res.send(genre);
});
router.get("/:id", auth, async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.params.id);

	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

	res.send(genre);
});

module.exports = router;
