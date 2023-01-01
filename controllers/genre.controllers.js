const asyncMiddleware = require("../middleware/async.middleware")
const { Genre, validateGenre } = require("../models/genre.models")

exports.getAllGenre = async (req, res, next) => {
  const genres = await Genre.find().sort("name")
  return res.status(200).json(genres)
}

exports.createGenre = async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({
    name: req.body.name,
  })
  genre = await genre.save()
  res.status(201).json(genre)
}

exports.updateGenre = async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  )
  if (!genre)
    return res.status(404).send("The genre with the given id does not exist")

  res.status(200).json({
    message: "Genre updated successfully",
    genre,
  })
}

exports.deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre)
    return res.status(404).send("The genre with the given id does not exist")
  res.status(200).json({
    message: "Genre deleted successfully",
    genre,
  })
}

exports.getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre)
    return res.status(404).send("The genre with the given id does not exist")
  return res.status(200).json(genre)
}
