# Crispyroll

Project Title: Crispyroll <br />
Camille Kyna Gonzales, Jennifer Trainor <br />

Link: https://crispyroll-dccbbd0aae2c.herokuapp.com/index

## Entities:
All CRUD steps are fully functioning on all entities.
1. Users <br />
&emsp; - When DELETEing a user, records of animes associated with that user are deleted from the intersection table (M:N relationship)
2. Animes <br />
&emsp; - Dynamic dropdown for Studios when UPDATEing
3. Studios
4. Ratings <br />
&emsp; - Able to set user_id FK to NULL with UPDATE (NULLable relationship) <br />
&emsp; - Dynamic dropdown for Users and Animes when CREATEing, and for Users when UPDATEing
5. Users/Animes <br />
&emsp; - M:N intersection table between Users and Animes <br />
&emsp; - DELETEing from this table does not affect related tables <br />
&emsp; - Dynamic dropdown for Users and Animes when CREATEing, and for Animes when UPDATEing

## Technologies used:
- Node.js
- Handlebars
- Javascript
- SQL
- Express
- CSS
