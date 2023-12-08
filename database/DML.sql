-- Project Title: Crispyroll
-- Group Name: Query Queens
-- Group 50: Camille Gonzales, Jennifer Trainor
-- CS340: Project Step 6

-- DATA MANIPULATION QUERIES: SELECT, INSERT, UPDATE and DELETE queries

-- NOTE: colon (:) character being used to denote the variables that will have data from the backend


/* ------------------- Studios queries ------------------- */
-- Select Studios for table
SELECT studio_id, studio_name, year_founded 
FROM Studios;

-- Select all Studios (dropdowns)
SELECT * FROM Studios;

-- Add new Studio
INSERT INTO Studios (studio_name, year_founded) 
VALUES (:studio_name_Input, :year_founded_Input);

-- Update Studio
UPDATE Studios 
SET year_founded = :year_founded_Input
WHERE studio_id = :studio_id_to_update;

-- Delete Studio
DELETE FROM Studios 
WHERE studio_id = :studio_id_to_delete;


/* ------------------- Animes queries ------------------- */
-- Select Animes for table
SELECT Animes.anime_id, Animes.title, Studios.studio_id, Animes.num_episode 
FROM Animes
INNER JOIN Studios ON Animes.studio_id = Studios.studio_id;

-- Select all Animes (dropdowns)
SELECT * FROM Animes;

-- Add new Anime
INSERT INTO Animes (title, studio_id, num_episode)
VALUES (:title_Input, :studio_id_from_dropdown, :num_episode_Input);

-- Update Anime
UPDATE Animes
SET studio_id = :studio_id_from_dropdown, :num_episode_Input
WHERE anime_id = :anime_id_to_update;

-- Delete Anime
DELETE FROM Animes 
WHERE anime_id = :anime_id_to_delete;


/* ------------------- Users queries ------------------- */
-- Select Users for table
SELECT user_id, user_name, user_email 
FROM Users;

-- Select all Users (dropdowns)
SELECT * FROM Users;

-- Add new User
INSERT INTO Users (user_name, user_email)
VALUES (:user_name_Input, :user_email_Input);

-- Update User
UPDATE Users
SET user_email = :user_email_Input
WHERE user_id = :user_id_to_update;

-- Delete User
DELETE FROM Users 
WHERE user_id = :user_id_to_delete;


/* ------------------- Users_Animes (M:N) queries ------------------- */
-- Select entries of Users with their associated Animes for table
SELECT Users_Animes.user_anime_id, Users.user_name, Animes.title
FROM Users_Animes
INNER JOIN Users ON Users_Animes.user_id = Users.user_id
INNER JOIN Animes ON Users_Animes.anime_id = Animes.anime_id;

-- Select row from Users_Animes for update form
SELECT Users_Animes.user_anime_id, Users.user_name, Animes.anime_id 
FROM Users_Animes 
INNER JOIN Users ON Users_Animes.user_id = Users.user_id 
INNER JOIN Animes ON Users_Animes.anime_id = Animes.anime_id
WHERE user_anime_id = :user_anime_id_from_query_string;

-- Associate a User with an Anime
INSERT INTO Users_Animes (user_id, anime_id)
VALUES (:user_id_from_dropdown, :anime_id_from_dropdown);

UPDATE Users_Animes 
SET anime_id = :anime_id_from_dropdown
WHERE user_anime_id = :user_anime_id_to_update;

-- Delete a selected M:N relationship from table
DELETE FROM Users_Animes 
WHERE user_anime_id = :user_anime_id_to_delete;


/* ------------------- Ratings queries ------------------- */
-- Select Ratings for table
SELECT Ratings.rating_id, Users.user_name, Animes.title, Ratings.rating, Ratings.review 
FROM Ratings
LEFT JOIN Users ON Ratings.user_id = Users.user_id
INNER JOIN Animes ON Ratings.anime_id = Animes.anime_id;

-- Select row from Ratings for update form
SELECT Ratings.rating_id, Users.user_id, Users.user_name, Animes.title, Ratings.rating, Ratings.review 
FROM Ratings LEFT JOIN Users ON Ratings.user_id = Users.user_id 
INNER JOIN Animes ON Ratings.anime_id = Animes.anime_id 
WHERE rating_id = :rating_id_from_query_string;

-- Add new Rating
INSERT INTO Ratings (user_id, anime_id, rating, review)
VALUES (:user_id_from_dropdown, :anime_id_from_dropdown, :rating_Input, :review_Input);

-- Update Rating
UPDATE Ratings
SET user_id = :user_id_from_dropdown, rating = :rating_Input, review = :review_Input
WHERE rating_id = :rating_id_to_update;

-- Delete Rating
DELETE FROM Ratings 
WHERE rating_id = :rating_id_to_delete;
