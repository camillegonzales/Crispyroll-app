// Delete User JS Function

/*  
  Citation for the following table and form: 
    Date: 11/29/2023
    Based on the CS340 starter code for dynamically deleting data
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
*/

// AJAX to delete user dynamically from table and dropdown
function deleteUser(user_id) {
    let data = {
        user_id: user_id
    };
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(user_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteRow(user_id){
    let table = document.getElementById("users-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == user_id) {
            table.deleteRow(i);
            deleteDropDownMenu(user_id);
            break;
        }
    }
}


function deleteDropDownMenu(user_id) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(user_id)) {
            selectMenu[i].remove();
            break;
        } 
    }
}
