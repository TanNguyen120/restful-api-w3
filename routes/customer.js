const express = require('express');
const router = express.Router();
const knex = require("../model/knex");

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const actors = await knex.knexObj('customer')
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
        const result = await knex.knexObj('customer').where('customer_id', id);
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
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const addressId = req.body.addressId;
        const createDay = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')
        const result = await knex.knexObj('customer').where('customer_id', id).update({ first_name: firstName, last_name: lastName, address_id: addressId, create_date: createDay });
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
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const addressId = req.body.addressId;
        const storeId = req.body.storeId;
        const createDay = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')
        const allCategories = await knex.knexObj('customer').insert({ first_name: firstName, last_name: lastName, address_id: addressId, create_date: createDay, store_id: storeId });
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
        const allCategories = await knex.knexObj('customer').where({ customer_id: id }).del();
        res.status(205).send('delete succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

module.exports = router;