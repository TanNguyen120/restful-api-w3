const express = require('express');
const router = express.Router();
const knex = require("../model/knex");

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const actors = await knex.knexObj('film_actor')
        res.status(200).json(actors)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */

router.get('/:filmId/:actorId', async function (req, res, next) {
    try {
        const film_id = !isNaN(parseInt(req.params.filmId)) ? req.params.filmId : 1;
        const actor_id = !isNaN(parseInt(req.params.actorId)) ? req.params.actorId : 1;

        const result = await knex.knexObj('film_actor').where({ actor_id: actor_id, film_id: film_id });
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

        const result = await knex.knexObj('film_actor').where({ film_id: film_id });
        res.status(200).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
//**************************************************************************************** */

router.put('/:filmId/:actorId', async function (req, res, next) {
    try {
        const id = !isNaN(parseInt(req.params.filmId)) ? req.params.filmId : 1;
        const actor_id = req.params.actorId;
        const result = await knex.knexObj('film_actor').where('film_actor_id', id).update({ actor_id: actor_id });
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
        const actor_id = req.body.actor_id;
        const film_id = req.body.film_id;
        const allCategories = await knex.knexObj('film_actor').insert({ film_id: film_id, actor_id: actor_id });
        res.status(201).send('insert succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});

//**************************************************************************************** */


router.delete('/:filmId/:actorId', async function (req, res, next) {
    try {
        const film_id = !isNaN(parseInt(req.params.filmId)) ? req.params.filmId : 1;
        const actor_id = !isNaN(parseInt(req.params.actorId)) ? req.params.actorId : 1;

        const result = await knex.knexObj('film_actor').where({ actor_id: actor_id, film_id: film_id }).del();
        res.status(205).json(result)

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
module.exports = router;