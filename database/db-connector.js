// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.JAWSDB_MARIA_HOST,
    user            : process.env.JAWSDB_MARIA_USER,
    password        : process.env.JAWSDB_MARIA_PASS,
    database        : process.env.JAWSDB_MARIA_DB
})

// Export it for use in our applicaiton
module.exports.pool = pool;
