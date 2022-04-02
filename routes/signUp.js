const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res, next) {
    // using bcrypt to hash the password
    const encryptPassword = bcrypt.hashSync(req.body.password, 13);
    try {
        const result = await knex.knexObj("user").insert({ username: req.body.username, password: encryptPassword });
        res.status(201).send('create succeed, table have ' + result + '2 rows');

    } catch (error) {
        res.status(500).send('some thing went wrong');
        console.error(error);
        throw error;
    }
});
module.exports = router;
