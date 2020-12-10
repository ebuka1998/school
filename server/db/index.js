const {Pool} = require('Pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'schoolapp',
    password: 'Emmanuel2018',
    port: 5432
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}