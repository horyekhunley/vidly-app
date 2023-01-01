const { Rental, validateRental } = require('../models/rentals.model')
const {Movie } = require('../models/movies.models')
const { Customer } = require('../models/customers.models')

exports.getAllRentals = async (req, res) => {
	const rentals = await Rental.find().sort('-dateOut')
	return res.status(200).json(rentals)
}

exports.createRental = async (req, res) => {
	const { error } = validateRental(req.body)
	if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Invalid customer')

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid movie')

    if(movie.numberInStock === 0) return res.status(400).send('Movie not available')

	const rental = new Rental({
		customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
	})
	await rental.save()

    movie.numberInStock--
    
	res.status(201).json(rental)
}

exports.updateRental = async (req, res) => {
	const { error } = validateMovie(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const movie = await Movie.findByIdAndUpdate(req.params.id, {...req.body}, {
		new: true
	})
	if (!movie) return res.status(404).send('The movie with the given id does not exist')

	res.status(200).json({
		message: 'Movie updated successfully',
		movie
	})}

exports.deleteRental = async (req, res) => {
	const movie = await Movie.findByIdAndRemove(req.params.id)
	if (!movie) return res.status(404).send('The movie with the given id does not exist')
	res.status(200).json({
		message: 'Movie deleted successfully',
		movie
	})
}

exports.getRentalById = async (req, res) => {
	const movie = await Movie.findById(req.params.id)
	if (!movie) return res.status(404).send('The movie with the given id does not exist')
	return res.status(200).json(movie)
}