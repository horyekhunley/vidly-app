const express = require('express')
const auth = require('../middleware/auth.middleware')
const { getAllMovies, createMovie, getMovieById, updateMovie, deleteMovie } = require("../controllers/movies.controllers");
const router = express.Router()

router.route('/').get(getAllMovies).post(auth, createMovie)

router.route('/:id').get(auth, getMovieById).put(auth, updateMovie).delete(auth, deleteMovie)

module.exports = router