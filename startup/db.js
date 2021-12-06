const mongoose = require('mongoose');
const {logger} = require('../middleware/error')

module.exports = function(){
    mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info('Connected to MongoDb'))
        // .catch(err => console.error('Error!.. connection wasn\'t made... ', err))
}