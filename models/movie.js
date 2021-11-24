const mongoose = require('mongoose');
const { genreSchema } = require('../models/genre');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

const validateMovie = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(6).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    })
    return schema.validate(data);
};

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validateMovie = validateMovie;