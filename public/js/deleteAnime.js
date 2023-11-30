//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// code for deletePerson using regular javascript/xhttp
function deleteAnime(anime_id) {
    // Put our data we want to send in a javascript object
    let data = {
      anime_id: anime_id
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-anime-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(anime_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(anime_id){

    let table = document.getElementById("animes-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == anime_id) {
            table.deleteRow(i);
            deleteDropDownMenu(anime_id);
            break;
       }
    }
}


function deleteDropDownMenu(anime_id){
  let selectMenu = document.getElementById("mySelectAnime");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(anime_id)){
      selectMenu[i].remove();
      break;
    } 
  }
}
