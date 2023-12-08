// Delete Users/Animes JS Function

/*  
  Citation for the following table and form: 
    Date: 12/06/2023
    Based on the CS340 starter code for dynamically deleting data
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
*/

// AJAX to DELETE user/anime (M:N relationship) dynamically from table
function deleteUserAnime(user_anime_id) {
    let data = {
        user_anime_id: user_anime_id
    };
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-user-anime-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(user_anime_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(user_anime_id) {
    let table = document.getElementById("users-animes-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == user_anime_id) {
            table.deleteRow(i);
            break;
        }
    }
}
