// Delete Anime JS Function

/*  
  Citation for the following table and form: 
    Date: 11/30/2023
    Based on the CS340 starter code for dynamically deleting data
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 
*/

// AJAX to delete anime dynamically from table and dropdown
function deleteAnime(anime_id) {
    let data = {
        anime_id: anime_id
    };
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-anime-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(anime_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteRow(anime_id) {
    let table = document.getElementById("animes-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == anime_id) {
            table.deleteRow(i);
            deleteDropDownMenu(anime_id);
            break;
        }
    }
}


function deleteDropDownMenu(anime_id) {
    let selectMenu = document.getElementById("mySelectAnime");
    for (let i = 0; i < selectMenu.length; i++) {
      if (Number(selectMenu.options[i].value) === Number(anime_id)) {
          selectMenu[i].remove();
          break;
        } 
    }
}
