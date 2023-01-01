const express = require("express")
const auth = require("../middleware/auth.middleware")
const {
  getAllRentals,
  createRental,
  getRentalById,
  updateRental,
  deleteRental,
} = require("../controllers/rentals.controllers")
const router = express.Router()

router.route("/").get(getAllRentals).post(auth, createRental)

router
  .route("/:id")
  .get(auth, getRentalById)
  .put(auth, updateRental)
  .delete(auth, deleteRental)

module.exports = router
