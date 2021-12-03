const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    endpoint: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: process.env.PORT
};

// const MONGODB_URI = 'mongodb+srv://canicemike:Canicemike1@cluster0.qgahg.mongodb.net/vidly?retryWrites=true&w=majority';
// exports.MONGODB_URI = MONGODB_URI;