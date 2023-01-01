const express = require("express")
const auth = require("../middleware/auth.middleware")
const {
  getAllGenre,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre.controllers")
const admin = require("../middleware/admin.middleware")
const router = express.Router()

router.route("/").get(getAllGenre).post(auth, createGenre)

router
  .route("/:id")
  .get(auth, getGenreById)
  .put(auth, updateGenre)
  .delete([auth, admin], deleteGenre)

module.exports = router
