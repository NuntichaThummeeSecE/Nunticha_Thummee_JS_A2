//using fetch with async and await//
async function getPokemonData() {
    try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        //check data from the api//
        console.log(data);

        //call displayPokemon function
        displayPokemon(data);

        //Implement error handling for the API call//
    } catch (error) {
        console.error(`Error:`, error);
    }
}

//function display data
const displayPokemon = (data) => {
    const pokemonImg = data.sprites.front_default; 

    //Update the image src
    document.getElementById('pokemonImg').src = pokemonImg;

}

getPokemonData();

