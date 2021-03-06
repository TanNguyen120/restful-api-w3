const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function (req, res, next) {
    try {
        const savePassWord = await knex.knexObj("user").where("username", req.body.username).select("password");
        const result = bcrypt.compareSync(req.body.password, savePassWord[0].password);
        if (result) {
            const userId = await knex.knexObj("user").where("username", req.body.username).select("id");
            const token = jwt.sign({ username: req.body.username, userId: userId[0].id }, 'mySecretKey', { expiresIn: '1h' });
            const refreshToken = randomString.generate(16);
            try {
                const result = await knex.knexObj('user').where({ id: userId[0].id }).update({ refreshToken: refreshToken });
                if (result) {
                    res.status(200).json({ message: "login succeed", accessToken: token, refreshToken: refreshToken });
                } else {
                    res.status(500).json({ message: "login failed" });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('some thing went wrong');
                throw error;
            }
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