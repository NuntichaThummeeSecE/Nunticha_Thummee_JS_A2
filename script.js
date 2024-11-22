document.addEventListener(`DOMContentLoaded`,() => {
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

    //navigate to game page after storing player data
    window.location.href = `game.html`;
}

document.addEventListener(`DOMContentLoaded`, () => {
    const startButton = document.getElementById(`startButton`);
    if (startButton) {
        startButton.addEventListener(`click`, createPlayer);
    } else {
        console.error(`startButton not found`);
    }

    
});

//add eventlistener to startbutton when clicked
/*document.getElementById(`startButton`).addEventListener(`click`, createPlayer);*/

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

getPokemonData();

});
