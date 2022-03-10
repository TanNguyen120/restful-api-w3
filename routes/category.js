const express = require('express');
const router = express.Router();
const knex = require("../model/knex")


//**************************************************************************************** */
router.get('/', async function (req, res, next) {
    try {
        const allCategories = await knex.knexObj('category')
        res.status(200).json(allCategories)

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
        const result = await knex.knexObj('category').where('category_id', id);
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
        const newCategory = req.body.name;
        const result = await knex.knexObj('category').where('category_id', id).update('name', newCategory);
        res.status(201).send('update succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});
//**************************************************************************************** */
router.post('/', async function (req, res, next) {
    try {
        const name = req.body.name;
        const allCategories = await knex.knexObj('category').insert({ name: name });
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
        const allCategories = await knex.knexObj('category').where({ category_id: id }).del();
        res.status(205).send('delete succeed')

    } catch (err) {
        res.status(500).send('some thing went wrong')
        console.error(err);
        throw err;
    }
});


module.exports = router;