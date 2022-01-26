const mongoose = require("mongoose");
const Joi = require("joi")

const rentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				trim: true,
				minlength: 5,
				maxlength: 50,
			},
			isGold: {
				type: Boolean,
				default: false,
			},
			phone: {
				type: String,
				required: true,
				min: 0,
				max: 50,
			},
		}),
		required: true,
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				required: true,
				trim: true,
				minlength: 5,
				maxlength: 255,
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				max: 255,
			},
		}),
		required: true,
	},
	dateOut: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	dateReturned: {
		type: Date,
	},
	rentalFee: {
		type: Number,
		min: 0,
	},
});

// genreSchema.methods.generateAuthToken = function(){
//   const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET)
//   return token
// }

const validate = (rental) => {


	const schema = Joi.object({
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required()
	});
	return schema.validate(rental);
};

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = {
	Rental,
	validate,
};
