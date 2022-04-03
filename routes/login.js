const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res, next) {
    try {
        const savePassWord = await knex.knexObj("user").where("username", req.body.username).select("password");
        const result = bcrypt.compareSync(req.body.password, savePassWord[0].password);
        if (result) {
            const token = jwt.sign({ username: req.body.username }, 'mySecretKey', { expiresIn: '1h' });
            res.status(200).json({ token: token });
        } else {
            res.status(401).send('wrong password');
        }
    } catch (err) {
        res.status(401).json({ message: "username or password is wrong" });
        console.error(err);
        throw err;
    }
});
module.exports = router;