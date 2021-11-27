const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 6,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength:6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1025
    }
});

const User = mongoose.model('User', userSchema);

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(50).required(),
        email: Joi.string().email().min(6).max(50).required(),
        password: Joi.string().min(6).max(1025).required()
    });
    return schema.validate(data);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;