//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateStudioForm = document.getElementById('update-studio-form-ajax');

// Modify the objects we need
updateStudioForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStudioName = document.getElementById("mySelectStudio");
    let inputYearFounded = document.getElementById("year-founded-update");

    // Get the values from the form fields
    let studioNameValue = inputStudioName.value;
    let yearFoundedValue = inputYearFounded.value;
    
    // currently the database table for studios does not allow updating values to NULL
    // so we must abort if being bassed NULL for year_founded

    if (isNaN(yearFoundedValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        studio_name: studioNameValue,
        year_founded: yearFoundedValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-studio-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, studioNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, studio_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("studios-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == studio_id) {

            // Get the location of the row where we found the matching studio ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of year_founded value
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign year_founded to our value we updated to
            td.innerHTML = parsedData[0].year_founded; 
       }
    }
}

