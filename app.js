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
var db      = require('./database/db-connector');    // Database
const { title } = require('process');
PORT        = 4400;                                 // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get("/", function(req, res){
    return res.render('index')
  });

app.get("/index", function(req, res){
    return res.render('index')
    });

app.get("/users", function(req, res){
    // Declare Query 1
    let query1 = "SELECT user_id, user_name, user_email FROM Users;";
    let query2 = "SELECT * FROM Animes;";
    let query3 = "SELECT * FROM Studios;";


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields) {

        let users = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            let animes = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let studios = rows;

                return res.render('users', {users:users, animes: animes, studios:studios});

    })
})})
});

app.post('/add-user', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Users (user_name, user_email) VALUES ('${data['input-user-name']}', '${data['input-user-email']}')`;
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
            res.redirect('/users');
        }
    })
});

app.delete('/delete-user-ajax/', function(req,res,next) {
    let data = req.body;
    let user_id = parseInt(data.user_id);
    let deleteUser = `DELETE FROM Users WHERE user_id = ${user_id}`;
  
  
    // Run the 1st query
    db.pool.query(deleteUser, [user_id], function(error, rows, fields) {
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

  app.get('/update-user', function(req, res)
  {  
      let user_id = req.query.user_id;

      // Declare Query 1
      let query1 = `SELECT * FROM Users WHERE user_id = ${user_id};`;

      // Run the 1st query
      db.pool.query(query1, function(error, rows, fields) {

          res.render('update-user', {data:rows[0]}
          );
      })
  });                                                                               


app.post('/put-user', function(req,res,next)
{
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  let user_id = parseInt(data['user-id-update']);
  let user_email = data['user-email-update'];

  // Create the query and run it on the database
  query1 = `UPDATE Users SET user_email = ? WHERE user_id = ?;`;
  db.pool.query(query1, [user_email, user_id], function(error, rows, fields) {

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
          res.redirect('/users');
      }
  })
});

app.get("/animes", function(req, res){
    // Declare Query 1
    let query1 = "SELECT Animes.anime_id, Animes.title, Studios.studio_name, Animes.num_episode FROM Animes INNER JOIN Studios ON Studios.studio_id = Animes.studio_id;";

    let query2 = "SELECT * FROM Studios;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields) {

        let animes = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            let studios = rows;

            return res.render('animes', {animes: animes, studios: studios});

    })
})
});

app.post('/add-anime', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let title = data['input-anime-title'];
    let studio_id = parseInt(data['mySelectStudio']);
    let num_episode = parseInt(data['input-num-episode']);

    // Create the query and run it on the database
    query1 = `INSERT INTO Animes (title, studio_id, num_episode) VALUES ('${title}', '${studio_id}', '${num_episode}')`;
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
            res.redirect('/animes')
        }
    })
});

app.delete('/delete-anime-ajax/', function(req,res,next) {
    let data = req.body;
    let anime_id = parseInt(data.anime_id);
    let deleteAnime = `DELETE FROM Animes WHERE anime_id = ${anime_id}`;
  
  
    // Run the 1st query
    db.pool.query(deleteAnime, [anime_id], function(error, rows, fields) {
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.get('/update-anime', function(req, res)
    {  
        let anime_id = req.query.anime_id;

        // Declare Query 1
        let query1 = `SELECT * FROM Animes WHERE anime_id = ${anime_id};`;
        let query2 = `SELECT * FROM Studios;`;

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields) {

            let data = rows[0]

            db.pool.query(query2, function(error, rows, fields) {

                let studios = rows;

                res.render('update-anime', {data:data, studios:studios}
            );
        })})
    });                                                                               


app.post('/put-anime', function(req,res,next)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let title = data['anime-title-update'];
    let studio_id = parseInt(data['mySelectStudio']);
    let num_episode = parseInt(data['num-episode-update']);
    let anime_id = parseInt(data['anime-id-update']);

    // Create the query and run it on the database
    query1 = `UPDATE Animes SET title = ${'title'}, studio_id = ${studio_id}, num_episode = ${num_episode} WHERE anime_id = ${anime_id};`;
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
            res.redirect('/animes');
        }
    })
});

app.get("/ratings", function(req, res)
    {  
        // Declare Query 1
        let query1 = "SELECT Ratings.rating_id, Users.user_name, Animes.title, Ratings.rating, Ratings.review FROM Ratings LEFT JOIN Users ON Ratings.user_id = Users.user_id INNER JOIN Animes ON Ratings.anime_id = Animes.anime_id ORDER BY rating_id ASC;";

        let query2 = "SELECT * FROM Users;";

        let query3 = "SELECT * FROM Animes;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields) {

            let ratings = rows;

            // Run the second query
            db.pool.query(query2, (error, rows, fields) => {
            
                let users = rows;

                // Run 3rd query
                db.pool.query(query3, (error, rows, fields) => {

                    let animes = rows;

                    return res.render('ratings', {ratings: ratings, users: users, animes: animes});
                })
                
            })
        })
    }); 

app.post('/add-rating', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        let user_id = parseInt(data['mySelectUserName']);
        let anime_id = parseInt(data['mySelectAnimeTitle']);
        let rating = parseInt(data['input-rating']);
        let review = data['input-review'];

        // Capture NULL values
        if (isNaN(user_id))
        {
            user_id = 'NULL'
        };

        // Create the query and run it on the database
        query1 = `INSERT INTO Ratings (user_id, anime_id, rating, review) VALUES (${user_id}, ${anime_id}, ${rating}, '${review}');`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                res.redirect('/ratings')
            }
        })
    });

app.delete('/delete-rating-ajax/', function(req,res,next) {
    let data = req.body;
    let rating_id = parseInt(data.rating_id);
    let delete_Rating = `DELETE FROM Ratings WHERE rating_id = ${rating_id}`;
    
    
    // Run the 1st query
    db.pool.query(delete_Rating, [rating_id], function(error, rows, fields) {
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.get('/update-rating', function(req, res)
{  
    let rating_id = req.query.rating_id;

    let query1 = `SELECT * FROM Ratings WHERE rating_id = ${rating_id};`;
    let query2 = `SELECT * FROM Users;`;
    let query3 = `SELECT * FROM Animes;`;

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields) {

        let ratings = rows[0];

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
        
            let users = rows;

            // Run 3rd query
            db.pool.query(query3, (error, rows, fields) => {

                let animes = rows;

                return res.render('update-rating', {ratings: ratings, users: users, animes: animes});
            })
            
        })
    })
});                                                         


app.post('/put-rating', function(req,res,next)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let rating_id = parseInt(data['rating-id-update']);
    let user_id = parseInt(data['mySelectUserID']);
    let anime_id = parseInt(data['mySelectAnimeTitle']);
    let rating = parseInt(data['rating-update']);
    let review = data['review-update'];

    // Capture NULL values
    if (isNaN(user_id))
    {
        user_id = 'NULL'
    };

    let updateRating = `UPDATE Ratings SET user_id = ${user_id}, anime_id = ${anime_id}, rating = ${rating}, review = '${review}' WHERE rating_id = ${rating_id};`;
    db.pool.query(updateRating, function(error, rows, fields) {

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
            res.redirect('/ratings');
        }
    }) 
});

app.get("/users_animes", function(req, res)
    {
        // Declare Query 1
        let query1 = "SELECT Users_Animes.user_anime_id, Users.user_name, Animes.title FROM Users_Animes INNER JOIN Users ON Users_Animes.user_id = Users.user_id INNER JOIN Animes ON Users_Animes.anime_id = Animes.anime_id ORDER BY user_anime_id ASC;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields) {

            res.render('users_animes', {useranimes:rows}
            );
        })
    });

    app.post('/add-user-anime', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let user_id = parseInt(data['mySelectUser'])
    let anime_id = parseInt(data['mySelectAnime'])

    // Create the query and run it on the database
    query1 = `INSERT INTO Users_Animes (user_id, anime_id) VALUES (${user_id}, ${anime_id});`;
    db.pool.query(query1, [user_id, anime_id], function(error, rows, fields) {

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
            res.redirect('/users_animes')
        }
    })
});

app.delete('/delete-user-anime-ajax/', function(req,res,next) {
    let data = req.body;
    let user_anime_id = parseInt(data.user_anime_id);
    let delete_UserAnime = `DELETE FROM Users_Animes WHERE user_anime_id = ${user_anime_id}`;
    
    
    // Run the 1st query
    db.pool.query(delete_UserAnime, [user_anime_id], function(error, rows, fields) {
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.get('/studios', function(req, res)
    {  
        // Declare Query 1
        let query1 = "SELECT studio_id, studio_name, year_founded FROM Studios;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields) {

            res.render('studios', {studios:rows}
            );
        })
    });                                                                               


app.post('/add-studio', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Studios (studio_name, year_founded) VALUES ('${data['input-studio-name']}', '${data['input-year-founded']}')`;
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
            res.redirect('/studios');
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

app.get('/update-studio', function(req, res)
    {  
        let studio_id = req.query.studio_id;

        // Declare Query 1
        let query1 = `SELECT * FROM Studios WHERE studio_id = ${studio_id};`;

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields) {

            res.render('update-studio', {data:rows[0]}
            );
        })
    });                                                                               


app.post('/put-studio', function(req,res,next)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let studio_id = parseInt(data['studio-id-update'])
    let year_founded = parseInt(data['year-founded-update'])

    // Create the query and run it on the database
    query1 = `UPDATE Studios SET year_founded = ${year_founded} WHERE studio_id = ${studio_id};`;
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
            res.redirect('/studios');
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function() {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});