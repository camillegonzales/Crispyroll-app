// Get the objects we need to modify
let updateRatingForm = document.getElementById('update-rating-form-ajax');

// Modify the objects we need
updateRatingForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRatingId = document.getElementById("rating-id-update");
    let inputUserName = document.getElementById("user-name-update");
    let inputTitle = document.getElementById("title-update");
    let inputRating = document.getElementById("rating-update");
    let inputReview = document.getElementById("review-update");


    // Get the values from the form fields
    let ratingIdValue = inputRatingId.value;
    let userNameValue = inputUserName.value;
    let titleValue = inputTitle.value;
    let ratingValue = inputRating.value;
    let reviewValue = inputReview.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(ratingValue)) 
    {
        return;
    } 

    if (isNaN(reviewValue)) 
    {
        return;
    } 


    // Put our data we want to send in a javascript object
    let data = {
        rating_id: ratingIdValue,
        user_name: userNameValue,
        title: titleValue,
        rating: ratingValue,
        review: reviewValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-rating-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, ratingIdValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, rating_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("ratings-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == rating_id) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign homeworld to our value we updated to
            td1.innerHTML = parsedData[0].user_name; 

            // Get td of homeworld value
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign homeworld to our value we updated to
            td2.innerHTML = parsedData[1].title; 

            // Get td of homeworld value
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            // Reassign homeworld to our value we updated to
            td3.innerHTML = parsedData[2].rating; 

            // Get td of homeworld value
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
            // Reassign homeworld to our value we updated to
            td4.innerHTML = parsedData[3].review; 

       }
    }
}
