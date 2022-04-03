const express = require('express');
const router = express.Router();
const knex = require("../model/knex");
/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const token = req.headers['authorization'];
        if (token) {
            const opt = {
                ignoreExpration: true,
            }
            await jwt.verify(token, 'mySecretKey', opt, async (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: "token is not valid" });
                } else {
                    const userId = decoded.userId;
                    const userName = decoded.username;
                    const refreshToken = req.body.refreshToken;
                    const savedReFreshToken = await knex.knexObj("user").where("id", userId).select("freshToken");
                    if (refreshToken === savedReFreshToken[0]) {
                        const accessToken = jwt.sign({ username: userName, userId: userId }, 'mySecretKey', { expiresIn: '1h' });
                        res.status(200).json({ message: "refreshed", accessToken: accessToken, refreshToken: refreshToken });
                    }
                }
            });
        } else {
            res.status(401).json({ message: "not have access token" });
        }
    } catch (err) {
        res.send('respond with a resource');
    };
});
module.exports = router;
