const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const stores = await knex.knexObj('store')
        res.status(200).json(stores)

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
        const result = await knex.knexObj('store').where('store_id', id);
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
        const manager_staff_id = req.body.manager_staff_id;
        const address_id = req.body.address_id;

        const result = await knex.knexObj('store').where('store_id', id).update(
            {
                manager_staff_id: manager_staff_id,
                address_id: address_id
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
        const manager_staff_id = req.body.manager_staff_id;
        const address_id = req.body.address_id;
        const allCategories = await knex.knexObj('store').insert({
            manager_staff_id: manager_staff_id,
            address_id: address_id
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
        const allCategories = await knex.knexObj('store').where({ store_id: id }).del();
        res.status(205).send('delete succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});


module.exports = router;