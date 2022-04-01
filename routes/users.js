const express = require('express');
const router = express.Router();
const knex = require("../model/knex");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users = await knex("users").select("*");
    res.status(200).json(users);

  } catch (error) {
    res.status(500).send('some thing went wrong');
    console.error(err);
    throw err;
  }
  res.send('respond with a resource');
});

module.exports = router;
