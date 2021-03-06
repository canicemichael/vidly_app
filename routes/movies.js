const express = require('express');
const { auth } = require('../middleware/auth');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('name');
    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre');

    const movie = new Movie({
        title: req.body.title,
        // genreId : "the ID" as it is written 
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
})

module.exports = router;