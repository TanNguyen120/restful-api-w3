const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res, next) {
    const encryptPassword = bcrypt.hashSync(req.body.password, 13);
    try {
        const result = await knex("users").insert(req.body.username, encryptPassword);
        res.status(201).send('create succeed' + result);

    } catch (error) {
        res.status(500).send('some thing went wrong');
        console.error(err);
        throw err;
    }
});
module.exports = router;
