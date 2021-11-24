const express = require('express');
const mongoose = require('mongoose');
const { endpoint, masterKey, port } = require('./config');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

const app = express();

mongoose.connect("mongodb://localhost/vidly_app2", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Error!.. connection wasn\'t made... ', err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});