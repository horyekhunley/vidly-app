const mongoose = require("mongoose");
const Joi = require("joi")

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Please provide a customer name"],
        minLength: 5,
        maxLength: 50,
        trim: true,
      },
      isGold: {
        type: Boolean,
        default: true,
      },
      phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true,
      },
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 255,
            trim: true,
          },
          dailyRentalRate: {
            type: Number,
            min: 0,
            max: 255,
            required: true,
        },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now()
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  }
});
const Rental = mongoose.model("rental", rentalSchema);

const validateRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
};

module.exports = {
  Rental,
  validateRental,
};
