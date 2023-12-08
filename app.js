// App.js 

/*  
  Citation for the following setup, routes, and listener: 
    Date: 11/14/2023
    Based on the CS340 starter code, with the exception of the UPDATE steps as our own work
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
*/


// Setup
var express = require('express');                   
var app     = express();                           
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
const { engine } = require('express-handlebars');
var exphbs  = require('express-handlebars');        
app.engine('.hbs', engine({extname: ".hbs"}));    
app.set('view engine', '.hbs');                   
var db      = require('./database/db-connector');    
const { title } = require('process');
PORT        = 4400;                          


// Routes
/* ---------- Index page ---------- */
app.get("/", function(req, res){
    return res.render('index')
  });

app.get("/index", function(req, res){
    return res.render('index')
    });


/* ---------- Users routes ---------- */
// Selects data to populate table on Users page
app.get("/users", function(req, res) {
    let query1 = "SELECT user_id, user_name, user_email FROM Users;";

    db.pool.query(query1, function(error, rows, fields) {
        let users = rows;
            return res.render('users', {users:users});
    })
});



// Adds new user to Users table and reloads page
app.post('/add-user', function(req, res) {
    let data = req.body;

    query1 = `INSERT INTO Users (user_name, user_email) VALUES ('${data['input-user-name']}', '${data['input-user-email']}')`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/users');
        }
    })
});


// Deletes selected user from Users table, deletes associated entries in Users/Animes table (M:N)
app.delete('/delete-user-ajax/', function(req,res,next) {
    let data = req.body;
    let user_id = parseInt(data.user_id);

    let deleteUser = `DELETE FROM Users WHERE user_id = ${user_id}`;
  
    db.pool.query(deleteUser, [user_id], function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});


// Selects row from Users table to populate user update form
app.get('/update-user', function(req, res) {  
    let user_id = req.query.user_id;

    let query1 = `SELECT * FROM Users WHERE user_id = ${user_id};`;

    db.pool.query(query1, function(error, rows, fields) {
        res.render('update-user', {data:rows[0]}
        );
    })
});                                                                               


// Updates selected row in Users table then redirects back to Users page
app.post('/put-user', function(req,res,next) {
    let data = req.body;
    let user_id = parseInt(data['user-id-update']);
    let user_email = data['user-email-update'];

    query1 = `UPDATE Users SET user_email = ? WHERE user_id = ?;`;

    db.pool.query(query1, [user_email, user_id], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/users');
        }
    })
});


/* ---------- Animes routes ---------- */
// Selects data to populate table and dynamic dropdown on Animes page
app.get("/animes", function(req, res) {
    let query1 = "SELECT Animes.anime_id, Animes.title, Studios.studio_name, Animes.num_episode FROM Animes INNER JOIN Studios ON Studios.studio_id = Animes.studio_id;";
    let query2 = "SELECT * FROM Studios;";

    db.pool.query(query1, function(error, rows, fields) {
        let animes = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let studios = rows;

            return res.render('animes', {animes: animes, studios: studios});
        })
    })
});


// Adds new anime to Animes table and reloads page
app.post('/add-anime', function(req, res) {
    let data = req.body;
    let title = data['input-anime-title'];
    let studio_id = parseInt(data['mySelectStudio']);
    let num_episode = parseInt(data['input-num-episode']);

    query1 = `INSERT INTO Animes (title, studio_id, num_episode) VALUES ('${title}', '${studio_id}', '${num_episode}')`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/animes')
        }
    })
});


// Deletes selected anime from Animes table
app.delete('/delete-anime-ajax/', function(req,res,next) {
    let data = req.body;
    let anime_id = parseInt(data.anime_id);

    let deleteAnime = `DELETE FROM Animes WHERE anime_id = ${anime_id}`;
  
    db.pool.query(deleteAnime, [anime_id], function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});


// Selects row from Animes table to populate anime update form
app.get('/update-anime', function(req, res) {  
    let anime_id = req.query.anime_id;

    let query1 = `SELECT * FROM Animes WHERE anime_id = ${anime_id};`;
    let query2 = `SELECT * FROM Studios;`;

    db.pool.query(query1, function(error, rows, fields) {
        let data = rows[0]

        db.pool.query(query2, function(error, rows, fields) {
            let studios = rows;

            res.render('update-anime', {data:data, studios:studios});
        })
    })
});                                                                               


// Updates selected row in Animes table then redirects back to Animes page
app.post('/put-anime', function(req,res,next) {
    let data = req.body;
    let studio_id = parseInt(data['mySelectStudio']);
    let num_episode = parseInt(data['num-episode-update']);
    let anime_id = parseInt(data['anime-id-update']);

    query1 = `UPDATE Animes SET studio_id = ${studio_id}, num_episode = ${num_episode} WHERE anime_id = ${anime_id};`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/animes');
        }
    })
});


/* ---------- Ratings routes ---------- */
// Selects data to populate table and dynamic dropdowns on Ratings page
app.get("/ratings", function(req, res) {  
    let query1 = "SELECT Ratings.rating_id, Users.user_name, Animes.title, Ratings.rating, Ratings.review FROM Ratings LEFT JOIN Users ON Ratings.user_id = Users.user_id INNER JOIN Animes ON Ratings.anime_id = Animes.anime_id ORDER BY rating_id ASC;";
    let query2 = "SELECT * FROM Users;";
    let query3 = "SELECT * FROM Animes;";

    db.pool.query(query1, function(error, rows, fields) {
        let ratings = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let users = rows;

            db.pool.query(query3, (error, rows, fields) => {
                let animes = rows;

                return res.render('ratings', {ratings: ratings, users: users, animes: animes});
            })
            
        })
    })
}); 


// Adds new rating to Ratings table and reloads page, user_id can be NULL (NULLable relationship)
app.post('/add-rating', function(req, res) {
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

    query1 = `INSERT INTO Ratings (user_id, anime_id, rating, review) VALUES (${user_id}, ${anime_id}, ${rating}, '${review}');`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/ratings')
        }
    })
});


// Deletes selected rating from Ratings table
app.delete('/delete-rating-ajax/', function(req,res,next) {
    let data = req.body;
    let rating_id = parseInt(data.rating_id);

    let delete_Rating = `DELETE FROM Ratings WHERE rating_id = ${rating_id}`;
    
    db.pool.query(delete_Rating, [rating_id], function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } 
        else 
        {
            res.sendStatus(204);
        }
    })
});


// Selects row from Ratings table to populate rating update form
app.get('/update-rating', function(req, res) {  
    let rating_id = req.query.rating_id;

    let query1 = `SELECT Ratings.rating_id, Users.user_id, Users.user_name, Animes.title, Ratings.rating, Ratings.review FROM Ratings LEFT JOIN Users ON Ratings.user_id = Users.user_id INNER JOIN Animes ON Ratings.anime_id = Animes.anime_id WHERE rating_id = ${rating_id};`;
    let query2 = `SELECT * FROM Users;`;

    db.pool.query(query1, function(error, rows, fields) {
        let ratings = rows[0];

        db.pool.query(query2, (error, rows, fields) => {
            let users = rows;
                return res.render('update-rating', {ratings: ratings, users: users});
        })
    })
});                                                         


// Updates selected row in Ratings table then redirects back to Ratings page, user_id can be NULL (NULLable relationship)
app.post('/put-rating', function(req,res,next) {
    let data = req.body;
    let rating_id = parseInt(data['rating-id-update']);
    let user_id = parseInt(data['mySelectUserID']);
    let rating = parseInt(data['rating-update']);
    let review = data['review-update'];

    // Capture NULL values
    if (isNaN(user_id))
    {
        user_id = 'NULL'
    };

    let updateRating = `UPDATE Ratings SET user_id = ${user_id}, rating = ${rating}, review = '${review}' WHERE rating_id = ${rating_id};`;
    db.pool.query(updateRating, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/ratings');
        }
    }) 
});


/* ---------- Users/Animes (M:N) routes ---------- */
// Selects data to populate table on Users/Animes page
app.get("/users_animes", function(req, res) {
    let query1 = "SELECT Users_Animes.user_anime_id, Users.user_name, Animes.title FROM Users_Animes INNER JOIN Users ON Users_Animes.user_id = Users.user_id INNER JOIN Animes ON Users_Animes.anime_id = Animes.anime_id ORDER BY user_anime_id ASC;";
    let query2 = "SELECT * FROM Animes;";
    let query3 = "SELECT * FROM Users;";

    db.pool.query(query1, function(error, rows, fields) {
        let useranimes = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let animes = rows;

            db.pool.query(query3, (error, rows, fields) => {
                let users = rows;

                return res.render('users_animes', {useranimes:useranimes, animes: animes, users:users});
            })
        })
    })
});


// Adds new Users/Animes (M:N) relationship made on Users page to intersection table and redirects to Users/Animes page
app.post('/add-user-anime', function(req, res) {
    let data = req.body;
    let user_id = parseInt(data['mySelectUser'])
    let anime_id = parseInt(data['mySelectAnime'])

    query1 = `INSERT INTO Users_Animes (user_id, anime_id) VALUES (${user_id}, ${anime_id});`;

    db.pool.query(query1, [user_id, anime_id], function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/users_animes')
        }
    })
});


// Deletes selected user/anime association from Users/Animes table
app.delete('/delete-user-anime-ajax/', function(req,res,next) {
    let data = req.body;
    let user_anime_id = parseInt(data.user_anime_id);

    let delete_UserAnime = `DELETE FROM Users_Animes WHERE user_anime_id = ${user_anime_id}`;
    
    db.pool.query(delete_UserAnime, [user_anime_id], function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } 
        else 
        {
            res.sendStatus(204);
        }
    })
});


// Selects row from Ratings table to populate rating update form
app.get('/update-useranime', function(req, res) {  
    let user_anime_id = req.query.user_anime_id;

    let query1 = `SELECT Users_Animes.user_anime_id, Users.user_name FROM Users_Animes INNER JOIN Users ON Users_Animes.user_id = Users.user_id WHERE user_anime_id = ${user_anime_id};`;
    let query2 = `SELECT * FROM Animes;`;

    db.pool.query(query1, function(error, rows, fields) {
        let useranime = rows[0];

        db.pool.query(query2, (error, rows, fields) => {
            let animes = rows;
                return res.render('update-useranime', {useranime :useranime, animes: animes});
            
        })
    })
});                                                         


// Updates selected row in Ratings table then redirects back to Ratings page, user_id can be NULL (NULLable relationship)
app.post('/put-useranime', function(req,res,next) {
    let data = req.body;
    let user_anime_id = parseInt(data['useranime-id-update']);
    let anime_id = parseInt(data['mySelectAnimeTitle']);

    let updateUserAnime = `UPDATE Users_Animes SET anime_id = ${anime_id} WHERE user_anime_id = ${user_anime_id};`;
    db.pool.query(updateUserAnime, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/users_animes');
        }
    }) 
});


/* ---------- Studios routes ---------- */
// Selects data to populate table on Studios page
app.get('/studios', function(req, res) {  
    let query1 = "SELECT studio_id, studio_name, year_founded FROM Studios;";

    db.pool.query(query1, function(error, rows, fields) {
        res.render('studios', {studios:rows});
    })
});                                                                               


// Adds new studio to Studios table and reloads Studios page
app.post('/add-studio', function(req, res) {
    let data = req.body;

    query1 = `INSERT INTO Studios (studio_name, year_founded) VALUES ('${data['input-studio-name']}', '${data['input-year-founded']}')`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/studios');
        }
    })
});


// Deletes selected studio from Studios table
app.delete('/delete-studio-ajax/', function(req,res,next) {
    let data = req.body;
    let studio_id = parseInt(data.studio_id);

    let delete_Studio = `DELETE FROM Studios WHERE studio_id = ${studio_id}`;
  
    db.pool.query(delete_Studio, [studio_id], function(error, rows, fields) {
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } 
        else 
        {
            res.sendStatus(204);
        }
    })
});


// Selects row from Studios table to populate studio update form
app.get('/update-studio', function(req, res) {  
    let studio_id = req.query.studio_id;

    let query1 = `SELECT * FROM Studios WHERE studio_id = ${studio_id};`;

    db.pool.query(query1, function(error, rows, fields) {
        res.render('update-studio', {data:rows[0]});
    })
});                                                                               


// Updates selected row in Studios table then redirects back to Studios page
app.post('/put-studio', function(req,res,next) {
    let data = req.body;
    let studio_id = parseInt(data['studio-id-update'])
    let year_founded = parseInt(data['year-founded-update'])

    query1 = `UPDATE Studios SET year_founded = ${year_founded} WHERE studio_id = ${studio_id};`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/studios');
        }
    })
});


// Listener
app.listen(PORT, function() {          
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
