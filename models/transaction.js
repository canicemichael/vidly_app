// const mongoose = require('mongoose');
// const { Rental } = require('../models/rental');
// const { Movie } = require('../models/movie');
// const Joi = require('joi');

// const txnSchema = new mongoose.Schema({
//     source: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Rental'
//     },
//     destination: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Movie'
//     },
//     lastModified: Date
// });

// const Transaction = mongoose.model('Transaction', txnSchema);

// const validateTxn = (data) => {
//     const schema = Joi.object({
//         source: Joi.object().ref(Rental),
//         destination: Joi.object().ref(Movie)
//     })
//     return schema.validate(data);
// }

// exports.txnSchema = txnSchema;
// exports.Transaction = Transaction;
// exports.validateTxn = validateTxn;