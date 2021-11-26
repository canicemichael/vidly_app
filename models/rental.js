const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 6,
                maxlength: 50,
                required: true
            },
            phone: {
                type: String,
                minlength: 10,
                maxlength: 15,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            }
        }),
        required: true     
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                trim: true,
                minlength: 6,
                maxlength: 255,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,        
    },
    rentalFee: {
        type: Number,
        min: 0,
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

const validateRental = (data) => {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(data);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validateRental = validateRental;