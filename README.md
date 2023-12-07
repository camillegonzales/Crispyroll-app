# Crispyroll

Project Title: Crispyroll <br />
Group 50: Camille Kyna Gonzales, Jennifer Trainor <br />

All code is based on the CS 340 starter code, with the exception of the UPDATE steps as our own work. <br />
Date: 11/14/2024 <br />
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 

## Entities:
1. Users - CREATE, READ, UPDATE, DELETE <br />
&emsp; - When DELETEing a user, records of animes associated with that user are deleted from the intersection table (M:N relationship)
2. Animes - CREATE, READ, UPDATE, DELETE
3. Studios - CREATE, READ, UPDATE, DELETE
4. Ratings - CREATE, READ, UPDATE, DELETE <br />
&emsp; - Able to set user_id FK to NULL with UPDATE (NULLable relationship)
5. Users/Animes - CREATE, READ, DELETE <br />
&emsp; - DELETEing from this table does not affect related tables

## Technologies used:
- Node.js
- Handlebars
- Javascript
- SQL
- Express
- CSS
