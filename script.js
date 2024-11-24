//create class which store user data
class Player {
    constructor(name, score = 0) {
        this.name = name;
        this.score = score;
    }

    //method update score when choose correct answer
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

    document.getElementById(`playerInfo`).innerText = `${playerData.name}`;
    document.getElementById(`score`).innerText = `${playerData.score} points`;
}

//make it as empty object
let pokemonChoices = {};

//using fetch with async and await
async function getPokemonData() {
    try {
        //random pokemon
        let correctId = Math.floor(Math.random() * 151) + 1;

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${correctId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //parsing JSON
        let data = await response.json();

        //create an object -- only need to use img and name of the pokemon
        currentPokemon = {
            id: correctId,
            name: data.name,
            image: data.sprites.front_default,
        }

        //check data from the api
        console.log(data);

        //add correct pokemon in to array
        pokemonChoices = [currentPokemon];

        //random pokemon name choices 
        while (pokemonChoices.length < 4) {
            let randomId = Math.floor(Math.random() * 151) + 1;
            //check randomId condition --> is not correctId and not already been used in the list of choices
            let nameChoices = pokemonChoices.filter(pokemon => pokemon.id === randomId);
            if (randomId !== correctId && !nameChoices.length) {
                let randomResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                if (!randomResponse.ok) {
                    throw new Error(`HTTP error! status: ${randomResponse.status}`);
                }
                //parsing JSON
                let randomData = await randomResponse.json();

                //add random pokemon to choices
                pokemonChoices.push({
                    id: randomId,
                    name: randomData.name,
                    image: randomData.sprites.front_default,
                });

            }
        }

        //call displayPokemon function
        displayPokemon(pokemonChoices);

        //Implement error handling for the API call
    } catch (error) {
        console.error(`Error:`, error);
    }
}

//function shuffle array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        //swap position
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//function display data
const displayPokemon = (pokemonChoices) => {

    //Update the image src
    document.getElementById(`pokemonImg`).src = pokemonChoices[0].image;

    //select all elements --> class choiceButton
    const choiceButtons = document.querySelectorAll(`.choiceButton`);

    //loop and add name of the pokemon to each button
    choiceButtons.forEach((button, index) => {
        button.innerText = pokemonChoices[index].name;
    });

}

//function update heart
const updateHeart = () => {
     //select all elements --> class heart
    const hearts = document.querySelectorAll(`#hearts .heart`);

    //hide heart 
    for (let i = 0; i < hearts.length; i++) {
        if (i >= wrongAnswers) {
            hearts[i].style.display = `inline`;
        } else {
            hearts[i].style.display = `none`;
        }
    }
}

let wrongAnswers = 0;
const maxWrongAnswers = 3;

//function handle when clicked answer
const handleAnswerClick = async (selectedAnswer) => {
    //get data from localStorage
    let playerData = JSON.parse(localStorage.getItem(`Player`));

    //create new player 
    playerData = new Player(playerData.name, playerData.score);

    //make correctAnswer = name of current showing pokemon img
    const correctAnswer = currentPokemon.name;

    if (selectedAnswer === correctAnswer) {
        //update score
        playerData.updateScore(10);

        //updated player data back to localStorage
        localStorage.setItem(`Player`, JSON.stringify(playerData));

        //display score
        display();

        //get next pokemon
        await getPokemonData();
    } else {
        //increases the value of the variable by 1
        wrongAnswers++;
        //move to next pokemon but waste 1 heart (have 3 hearts)
        updateHeart();

        if (wrongAnswers >= maxWrongAnswers) {
            //delay for updateHeart
            setTimeout(() => {
                alert(`Game Over!`);
                //go to leadBoard page
                window.location.href = `leadBoard.html`;
            }, 400);
        } else {
            //get next pokemon
            await getPokemonData();
        }
    }

};


//add eventlistener to the buttons
const choiceButtons = document.querySelectorAll(`.choiceButton`);

choiceButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        const selectedAnswer = button.innerText;
        handleAnswerClick(selectedAnswer);
    });
});

//call createPlayer function when click start button
const startGame = () => {
    createPlayer();
}

display();
getPokemonData();

