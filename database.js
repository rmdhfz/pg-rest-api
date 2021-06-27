const pl = require('pg').Pool
const pool = new pl({
    user: 'YOUR_USER',
    host: 'localhost',
    database: 'YOUR_DB',
    password: 'password',
    port: 'YOUR_PORT',
})

module.exports = pool;