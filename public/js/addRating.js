//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addRatingForm = document.getElementById('add-rating-form-ajax');

// Modify the objects we need
addRatingForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserName = document.getElementById("input-user-name");
    let inputTitle = document.getElementById("input-title");
    let inputRating = document.getElementById("input-rating");
    let inputReview = document.getElementById("input-review");

    // Get the values from the form fields
    let userNameValue = inputUserName.value;
    let titleValue = inputTitle.value;
    let ratingValue = inputRating.value;
    let reviewValue = inputReview.value;

    // Put our data we want to send in a javascript object
    let data = {
        user_name: userNameValue,
        title: titleValue,
        rating: ratingValue,
        review: reviewValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-rating-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUserName.value = '';
            inputTitle.value = '';
            inputRating.value = '';
            inputReview.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("ratings-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let ratingIDCell = document.createElement("TD");
    let userNameCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let ratingCell = document.createElement("TD");
    let reviewCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    ratingIDCell.innerText = newRow.rating_id;
    userNameCell.innerText = newRow.user_name;
    titleCell.innerText = newRow.title;
    ratingCell.innerText = newRow.rating;
    reviewCell.innerText = newRow.review;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteRating(newRow.rating_id);
    };

    // Add the cells to the row 
    row.appendChild(ratingIDCell);
    row.appendChild(userNameCell);
    row.appendChild(titleCell);
    row.appendChild(ratingCell);
    row.appendChild(reviewCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.rating_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}