const express = require('express');
const { Customer, validateCustomer } = require('../models/customer');
const { auth } = require('../middleware/auth');
const {admin} = require('../middleware/admin');
const router = express.Router();

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.get('/cust/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    await customer.save();

    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found');

    res.send(customer);
})

module.exports = router;