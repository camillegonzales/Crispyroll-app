-- Project Title: Crispyroll
-- Group Name: Query Queens
-- Group 50: Camille Gonzales, Jennifer Trainor
-- CS340: Project Step 6

-- DATA DEFINITION QUERIES: CREATE tables, INPUT example data

-- Disable commits and foreign key checks at the beginning of the file
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Studios table
DROP TABLE IF EXISTS Studios;
CREATE TABLE Studios (
    studio_id INT AUTO_INCREMENT NOT NULL,
    studio_name VARCHAR(45) NOT NULL,
    year_founded INT NOT NULL,
    PRIMARY KEY (studio_id)
);

-- Create Animes table
DROP TABLE IF EXISTS Animes;
CREATE TABLE Animes (
    anime_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(145) NOT NULL,
    studio_id INT NOT NULL,
    num_episode INT NOT NULL,
    PRIMARY KEY (anime_id),
    FOREIGN KEY (studio_id) REFERENCES Studios(studio_id) ON DELETE CASCADE
);

-- Create Users table
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(45) NOT NULL,
    user_email VARCHAR(145) NOT NULL,
    PRIMARY KEY (user_id) 
);

-- Create Users_Animes intersection table
DROP TABLE IF EXISTS Users_Animes;
CREATE TABLE Users_Animes (
    user_anime_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    anime_id INT NOT NULL,
    PRIMARY KEY (user_anime_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (anime_id) REFERENCES Animes(anime_id) ON DELETE CASCADE
);

-- Create Ratings table
DROP TABLE IF EXISTS Ratings;
CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    anime_id INT NOT NULL,
    rating INT NOT NULL,
    review VARCHAR(218) NOT NULL,
    PRIMARY KEY (rating_id),
    FOREIGN KEY (anime_id) REFERENCES Animes(anime_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Insert example data into Studios table
INSERT INTO Studios (studio_name, year_founded)
VALUES
    ('Nippon TV', 1952),
    ('MAPPA', 2011),
    ('CloverWorks', 2018);
    
-- Insert example data into Animes table
INSERT INTO Animes (title, studio_id, num_episode)
VALUES 
    ('Hunter x Hunter', (SELECT studio_id FROM Studios WHERE studio_name='Nippon TV'), 148),
    ('Attack on Titan', (SELECT studio_id FROM Studios WHERE studio_name='MAPPA'), 88),
    ('Terror in Resonance', (SELECT studio_id FROM Studios WHERE studio_name='MAPPA'), 11),
    ('Jujutsu Kaisen', (SELECT studio_id FROM Studios WHERE studio_name='MAPPA'), 24),
    ('The Promised Neverland', (SELECT studio_id FROM Studios WHERE studio_name='CloverWorks'), 12);

-- Insert example data into Users table
INSERT INTO Users (user_name, user_email)
VALUES 
    ('Honestliz', 'liz_re6@gmail.com'),
    ('Serexolik', 'mparker22@gmail.com'),
    ('Pebbles44', 'seanmorg@yahoo.com'),
    ('PeppermintP', 'pmin873@gmail.com'),
    ('wstr000', 'lilyt01@yahoo.com');

-- Insert example data into Users_Animes intersection table
INSERT INTO Users_Animes (user_id, anime_id)
VALUES
    ((SELECT user_id FROM Users WHERE user_name='Honestliz'), (SELECT anime_id FROM Animes WHERE title='Hunter x Hunter')),
    ((SELECT user_id FROM Users WHERE user_name='Honestliz'), (SELECT anime_id FROM Animes WHERE title='Attack on Titan')),
    ((SELECT user_id FROM Users WHERE user_name='Honestliz'), (SELECT anime_id FROM Animes WHERE title='Terror in Resonance')),
    ((SELECT user_id FROM Users WHERE user_name='Serexolik'), (SELECT anime_id FROM Animes WHERE title='Jujutsu Kaisen')),
    ((SELECT user_id FROM Users WHERE user_name='Serexolik'), (SELECT anime_id FROM Animes WHERE title='The Promised Neverland')),
    ((SELECT user_id FROM Users WHERE user_name='Pebbles44'), (SELECT anime_id FROM Animes WHERE title='Attack on Titan')),
    ((SELECT user_id FROM Users WHERE user_name='Pebbles44'), (SELECT anime_id FROM Animes WHERE title='The Promised Neverland')),
    ((SELECT user_id FROM Users WHERE user_name='PeppermintP'), (SELECT anime_id FROM Animes WHERE title='Hunter x Hunter')),
    ((SELECT user_id FROM Users WHERE user_name='wstr000'), (SELECT anime_id FROM Animes WHERE title='Attack on Titan'));

-- Insert example data into Ratings table
INSERT INTO Ratings (user_id, anime_id, rating, review)
VALUES 
    ((SELECT user_id FROM Users WHERE user_name='Honestliz'), (SELECT anime_id FROM Animes WHERE title='Hunter x Hunter'), 5, 'My favorite anime of all time!!'),
    ((SELECT user_id FROM Users WHERE user_name='Honestliz'), (SELECT anime_id FROM Animes WHERE title='Attack on Titan'), 5, 'One of the best animes out there, the plot is so thought out and the characters are all brilliantly written'),
    ((SELECT user_id FROM Users WHERE user_name='Honestliz'), (SELECT anime_id FROM Animes WHERE title='Terror in Resonance'), 5, 'Really sad but very well written and unique'),
    ((SELECT user_id FROM Users WHERE user_name='Serexolik'), (SELECT anime_id FROM Animes WHERE title='The Promised Neverland'), 3, 'Season 1 was amazing, but season 2 was really bad'),
    ((SELECT user_id FROM Users WHERE user_name='PeppermintP'), (SELECT anime_id FROM Animes WHERE title='Hunter x Hunter'), 5, 'Such an original anime and I love the main characters'),
    ((SELECT user_id FROM Users WHERE user_name='wstr000'), (SELECT anime_id FROM Animes WHERE title='Attack on Titan'), 4, 'The later seasons confuse me, but still one of my faves');

-- Turn commits and foreign key checks back on
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
