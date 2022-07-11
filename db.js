const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "0000",
    database: "testdb",
    // database: "jinsim",
    // host: "localhost",
    port: 5432
});

module.exports = pool;