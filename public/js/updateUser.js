//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserName = document.getElementById("mySelect");
    let inputUserEmail = document.getElementById("user-email-update");

    // Get the values from the form fields
    let userNameValue = inputUserName.value;
    let userEmailValue = inputUserEmail.value;
    
    // currently the database table for users does not allow updating values to NULL
    // so we must abort if being bassed NULL for year_founded

    if (isNaN(userEmailValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        user_name: userNameValue,
        user_email: userEmailValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, userNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, user_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("users-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == user_id) {

            // Get the location of the row where we found the matching user ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of user_email value
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign user_email to our value we updated to
            td.innerHTML = parsedData[0].user_email; 
       }
    }
}

