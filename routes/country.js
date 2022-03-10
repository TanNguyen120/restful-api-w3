const express = require('express');
const router = express.Router();
const knex = require("../model/knex");

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const actors = await knex.knexObj('country')
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
        const result = await knex.knexObj('country').where('country_id', id);
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
        const country = req.body.country;
        const result = await knex.knexObj('country').where('country_id', id).update({ country: country });
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
        const countryName = req.body.country;
        const allCategories = await knex.knexObj('country').insert({ country: countryName });
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
        const allCategories = await knex.knexObj('country').where({ country_id: id }).del();
        res.status(205).send('delete succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});


module.exports = router;