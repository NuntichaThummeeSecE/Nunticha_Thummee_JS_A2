//create class which store user data
class Player {
    constructor(name, score = 0) {
        this.name = name;
        this.score = score;
    }

    //update score when choose correct answer
    updateScore(points) {
        this.score += points;
    }
}

//get name from the user input
const createPlayer = () => {
    let playerName = document.getElementById(`playerName`).value;

    //check the input to make sure the player's name has been entered
    if (playerName === ``) {
        alert(`Please enter a player name!`);
        return;
    }

    //create a new player instance
    let newPlayer = new Player(playerName);

    //store player name in local storage
    localStorage.setItem(`Player`, JSON.stringify(newPlayer));

    //go to the game page 
    window.location.href = `game.html`;

}

//display userdata from Player class
const display = () => {
    //parse JSON string to object
    let playerData = JSON.parse(localStorage.getItem(`Player`));

    document.getElementById(`playerInfo`).innerText =`${playerData.name}`;
    document.getElementById(`score`).innerText = `${playerData.score} points`;
}


//using fetch with async and await
async function getPokemonData() {
    try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //parsing JSON
        let data = await response.json();

        //create an object -- only need to use img and name of the pokemon
        let pokemon = {
            name: data.name,
            image: data.sprites.front_default,
        }

        //check data from the api
        console.log(data);


        //call displayPokemon function
        displayPokemon(pokemon);

        //Implement error handling for the API call
    } catch (error) {
        console.error(`Error:`, error);
    }
}

//function display data
const displayPokemon = (pokemon) => {

    //Update the image src
    document.getElementById(`pokemonImg`).src = pokemon.image;

    //Update pokemon name
    document.getElementById(`pokemonName`).innerText = pokemon.name;

}

//call createPlayer function when click start button
const startGame = () => {
    createPlayer();
}

display();
getPokemonData();
