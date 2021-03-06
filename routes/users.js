const bcrypt = require('bcrypt');
const {auth} = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.header._id).select('-password');  // this is not working
        res.send(user);
    } catch(error) {
        console.log(error);
        res.send('An error occured');
    }
})

//REGISTER
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})

module.exports = router;