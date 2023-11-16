//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// App.js

/*
    SETUP
*/
var express = require('express');                   // We are using the express library for the web server
var app     = express();                            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
const { engine } = require('express-handlebars');
var exphbs  = require('express-handlebars');        // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));      // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
var db      = require('./database/db-connector')    // Database
PORT        = 4200;                                 // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get("/", function(req, res){
    return res.render('index')
  });

app.get("/index.html", function(req, res){
    return res.render('index')
    });

app.get("/users.html", function(req, res){
    return res.render('users')
    });

app.get("/animes.html", function(req, res){
    return res.render('animes')
    });

app.get("/ratings.html", function(req, res){
    return res.render('ratings')
    });

app.get("/users_animes.html", function(req, res){
    return res.render('users_animes')
    });

app.get('/studios.html', function(req, res)
    {  
        // Declare Query 1
        let query1 = "SELECT studio_id, studio_name, year_founded FROM Studios;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields) {

            res.render('studios', {data:rows}
            );
        })
    });                                                                               

// app.js - ROUTES section

app.post('/add-studio-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let studio_id = parseInt(data.studio_id);
    if (isNaN(studio_id))
    {
        studio_id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Studios (studio_name, year_founded) VALUES ('${data.studio_name}', '${data.year_founded}')`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Studios;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-studio-ajax/', function(req,res,next) {
    let data = req.body;
    let studio_id = parseInt(data.studio_id);
    let delete_Studio = `DELETE FROM Studios WHERE studio_id = ${studio_id}`;
  
  
    // Run the 1st query
    db.pool.query(delete_Studio, [studio_id], function(error, rows, fields) {
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/put-studio-ajax', function(req,res,next){
    let data = req.body;
    let studio_name = parseInt(data.studio_name);
    let year_founded = parseInt(data.year_founded);

    let updateStudio = `UPDATE Studios SET year_founded = ${year_founded} WHERE studio_id = ${studio_name}`;
    let selectStudio = `SELECT * FROM Studios WHERE studio_id = ${studio_name}`;

  
          // Run the 1st query
          db.pool.query(updateStudio, [studio_name, year_founded], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectStudio, [studio_name], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
              }
  })});

/*
    LISTENER
*/
app.listen(PORT, function() {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});