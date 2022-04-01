const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res, next) {
    try {
        const savePassWord = await knex("users").where("username", req.body.username).select("password");
        const result = bcrypt.compareSync(req.body.password, savePassWord[0].password);
        if (result) {
            res.status(200).send('login succeed');
        } else {
            res.status(401).send('login failed');
        }
    } catch (error) {
        res.status(401).json({ messeage: "username or password is wrong" });
        console.error(err);
        throw err;
    }
});
module.exports = router;