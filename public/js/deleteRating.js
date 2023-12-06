// Delete Rating JS Function

/*  
  Citation for the following table and form: 
    Date: 11/29/2023
    Based on the CS340 starter code for dynamically deleting data
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
*/

// AJAX to delete rating dynamically from table
function deleteRating(rating_id) {
    let data = {
        rating_id: rating_id
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-rating-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(rating_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteRow(rating_id){

    let table = document.getElementById("ratings-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == rating_id) {
            table.deleteRow(i);
            break;
        }
    }
}