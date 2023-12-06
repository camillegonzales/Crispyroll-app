// Delete Studio JS Function

/*  
  Citation for the following table and form: 
    Date: 11/15/2023
    Based on the CS340 starter code for dynamically deleting data
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
*/

// AJAX to delete studio dynamically from table and dropdown
function deleteStudio(studio_id) {
    let data = {
        studio_id: studio_id
    };
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-studio-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(studio_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteRow(studio_id) {
    let table = document.getElementById("studios-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == studio_id) {
            table.deleteRow(i);
            deleteDropDownMenu(studio_id);
            break;
        }
    }
}


function deleteDropDownMenu(studio_id) {
    let selectMenu = document.getElementById("mySelectStudio");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(studio_id)) {
            selectMenu[i].remove();
            break;
        } 
    }
}
