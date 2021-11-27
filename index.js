const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const { endpoint, masterKey, port } = require('./config');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');

const app = express();

const MONGODB_URI = 'mongodb+srv://canicemike:Canicemike1@cluster0.qgahg.mongodb.net/vidly?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Error!.. connection wasn\'t made... ', err))

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});