const knex = require('knex')


exports.knexObj = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'sakila'
    },
    pool: { min: 0, max: 10 }
});