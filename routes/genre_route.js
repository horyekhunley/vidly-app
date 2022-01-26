const express = require("express");
const Joi = require('joi')
const { Genre, validate } = require("../models/genre_model");
const router = express.Router();

router.get("/", async (req, res) => {
	const genres = await Genre.find().sort("name");
	res.send(genres);
});
router.post("/", async(req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = new Genre({ ...req.body });
	await genre.save();

	res.send(genre);
});

router.put("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

    res.send(genre)
});
router.delete("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndRemove(req.params.id,);

	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

    res.send(genre)
});
router.get("/:id", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.params.id,);

	if (!genre)
		return res.status(404).send("The genre with the given id was not found");

    res.send(genre)
})

module.exports = router