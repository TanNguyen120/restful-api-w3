const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
const auth = require("../auth/compareToken");

/* GET home page. */
router.get('/', auth.compareToken, async (req, res, next) => {
    try {
        const actors = await knex.knexObj('film')
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
        const result = await knex.knexObj('film').where('film_id', id);
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
        const title = req.body.title;
        const description = req.body.description;
        const release_year = req.body.release_year;
        const language_id = req.body.language_id;
        const original_language_id = req.body.original_language_id;
        const rental_duration = req.body.rental_duration;
        const rental_rate = req.body.rental_rate;
        const length = req.body.length;
        const replacement_cost = req.body.replacement_cost;
        const rating = req.body.rating;
        const special_features = req.body.special_features;
        const last_update = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');
        const result = await knex.knexObj('film').where('film_id', id).update(
            {
                title: title,
                description: description,
                release_year: release_year,
                language_id: language_id,
                original_language_id: original_language_id,
                rental_duration: rental_duration,
                rental_rate: rental_rate,
                length: length,
                replacement_cost: replacement_cost,
                rating: rating,
                special_features: special_features,
                last_update: last_update
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
        const title = req.body.title;
        const description = req.body.description;
        const release_year = req.body.release_year;
        const language_id = req.body.language_id;
        const original_language_id = req.body.original_language_id;
        const rental_duration = req.body.rental_duration;
        const rental_rate = req.body.rental_rate;
        const length = req.body.length;
        const replacement_cost = req.body.replacement_cost;
        const rating = req.body.rating;
        const special_features = req.body.special_features;
        const last_update = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');
        const result = await knex.knexObj('film').insert(
            {
                title: title,
                description: description,
                release_year: release_year,
                language_id: language_id,
                original_language_id: original_language_id,
                rental_duration: rental_duration,
                rental_rate: rental_rate,
                length: length,
                replacement_cost: replacement_cost,
                rating: rating,
                special_features: special_features,
                last_update: last_update
            });
        res.status(202).send('create succeed')

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
        const allCategories = await knex.knexObj('film').where({ film_id: id }).del();
        res.status(205).send('delete succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

module.exports = router;