//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addUserForm = document.getElementById('add-user-form-ajax');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserName = document.getElementById("input-user-name");
    let inputUserEmail = document.getElementById("input-user-email");

    // Get the values from the form fields
    let userNameValue = inputUserName.value;
    let userEmailValue = inputUserEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        user_name: userNameValue,
        user_email: userEmailValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUserName.value = '';
            inputUserEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// users
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("users-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let userIDCell = document.createElement("TD");
    let userNameCell = document.createElement("TD");
    let userEmailCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    userIDCell.innerText = newRow.user_id;
    userNameCell.innerText = newRow.user_name;
    userEmailCell.innerText = newRow.user_email;
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteUser(newRow.user_id);
    };

    // Add the cells to the row 
    row.appendChild(userIDCell);
    row.appendChild(userNameCell);
    row.appendChild(userEmailCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.user_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (studio_name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.user_name;
    option.value = newRow.user_id;
    selectMenu.add(option);
    // End of new step 8 code.
}