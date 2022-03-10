const express = require('express');
const router = express.Router();
const knex = require("../model/knex");

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const actors = await knex.knexObj('payment')
        res.status(200).json(actors)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */

router.get('/:id', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.id)) ? req.params.id : 1;
        const result = await knex.knexObj('payment').where('payment_id', id);
        res.status(200).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
router.get('/customer/:id', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.id)) ? req.params.id : 1;
        const result = await knex.knexObj('payment').where('customer_id', id);
        res.status(200).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
router.get('/staff/:id', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.id)) ? req.params.id : 1;
        const result = await knex.knexObj('payment').where('staff_id', id);
        res.status(200).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
//**************************************************************************************** */

router.put('/:id', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.id)) ? req.params.id : 1;
        const customer_id = req.body.customer_id;
        const staff_id = req.body.staff_id;
        const amount = req.body.amount;
        const payment_date = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')
        const result = await knex.knexObj('payment').where('payment_id', id).update({
            customer_id: customer_id,
            staff_id: staff_id,
            amount: amount,
            payment_date: payment_date
        });
        res.status(201).send('update succeed' + result);

    } catch (err) {
        res.status(500).send('some thing went wrong');
        console.error(err);
        throw err;
    }
});
//**************************************************************************************** */
router.post('/', async function (req, res, next) {
    try {
        const customer_id = req.body.customer_id;
        const staff_id = req.body.staff_id;
        const amount = req.body.amount;
        const payment_date = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');
        const allCategories = await knex.knexObj('payment').insert({
            customer_id: customer_id,
            staff_id: staff_id,
            amount: amount,
            payment_date: payment_date
        });
        res.status(201).send('insert succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */
router.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const allCategories = await knex.knexObj('payment').where({ payment_id: id }).del();
        res.status(205).send('delete succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

module.exports = router;