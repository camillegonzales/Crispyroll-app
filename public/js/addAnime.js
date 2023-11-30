//Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addAnimeForm = document.getElementById('add-anime-form-ajax');

// Modify the objects we need
addAnimeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAnimeTitle = document.getElementById("input-anime-title");
    let inputNumEpisode = document.getElementById("input-num-episode");

    // Get the values from the form fields
    let animeTitleValue = inputAnimeTitle.value;
    let numEpisodeValue = inputNumEpisode.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: animeTitleValue,
        num_episode: numEpisodeValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-anime-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputAnimeTitle.value = '';
            inputNumEpisode.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// animes
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("animes-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let animeIDCell = document.createElement("TD");
    let animeTitleCell = document.createElement("TD");
    let numEpisodeCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    animeIDCell.innerText = newRow.user_id;
    animeTitleCell.innerText = newRow.user_name;
    numEpisodeCell.innerText = newRow.num_episode;
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteAnime(newRow.anime_id);
    };

    // Add the cells to the row 
    row.appendChild(animeIDCell);
    row.appendChild(animeTitleCell);
    row.appendChild(numEpisodeCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.anime_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (user_name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.anime_title;
    option.value = newRow.anime_id;
    selectMenu.add(option);
    // End of new step 8 code.
}
