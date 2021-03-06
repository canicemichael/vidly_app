const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const router = express.Router();

//LOGIN
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
})

const validate = (req) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(1025).required()
    })
    return schema.validate(req);
}

module.exports = router;