const express = require('express');
const router = express.Router();
const knex = require("../model/knex");

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const actors = await knex.knexObj('film_category')
        res.status(200).json(actors)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */

router.get('/:filmId/:categoryId', async function (req, res, next) {
    try {
        const film_id = !isNaN(parseInt(req.params.filmId)) ? req.params.filmId : 1;
        const category_id = !isNaN(parseInt(req.params.categoryId)) ? req.params.categoryId : 1;

        const result = await knex.knexObj('film_category').where({ category_id: category_id, film_id: film_id });
        res.status(200).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
router.get('/:filmId', async function (req, res, next) {
    try {
        const film_id = !isNaN(parseInt(req.params.filmId)) ? req.params.filmId : 1;

        const result = await knex.knexObj('film_category').where({ film_id: film_id });
        res.status(200).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
//**************************************************************************************** */

router.put('/:filmId/:categoryId', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.filmId)) ? req.params.filmId : 1;
        const category_id = req.params.categoryId;
        const result = await knex.knexObj('film_category').where('film_category_id', id).update({ category_id: category_id });
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
        const category_id = req.body.category_id;
        const film_id = req.body.film_id;
        const allCategories = await knex.knexObj('film_category').insert({ film_id: film_id, category_id: category_id });
        res.status(201).send('insert succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */


router.delete('/:filmId/:categoryId', async function (req, res, next) {
    try {
        const film_id = !isNaN(parseInt(req.params.filmId)) ? req.params.filmId : 1;
        const category_id = !isNaN(parseInt(req.params.categoryId)) ? req.params.categoryId : 1;

        const result = await knex.knexObj('film_category').where({ category_id: category_id, film_id: film_id }).del();
        res.status(205).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
module.exports = router;