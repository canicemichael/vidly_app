const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
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
})

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(50).required(),
        phone: Joi.string().min(10).max(15).required(),
        isGold: Joi.boolean().required()
    })
    return schema.validate(data);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validateCustomer = validateCustomer;