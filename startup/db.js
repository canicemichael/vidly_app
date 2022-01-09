const mongoose = require('mongoose');
const {logger} = require('../middleware/error')
const config = require('config');

module.exports = function(){
    const db = config.get('db');
    // mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }) //what it looked like b4 some changes were made
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info(`Connected to MongoDB...`))
}