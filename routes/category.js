const express = require('express');
const router = express.Router();
const knex = require("../model/knex")


/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const allCategories = await knex.knexObj('category')
        res.json(allCategories)

    } catch (err) {
        console.error(err);
        throw err;
    }

});

module.exports = router;