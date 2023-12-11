// Database Connector

/*  
  Citation for the following setup: 
    Date: 11/14/2023
    Based on the CS340 starter code
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
*/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_gonzcami',
    password        : '3600',
    database        : 'cs340_gonzcami'
})

// Export it for use in our applicaiton
module.exports.pool = pool;