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
         //assigns the variable currencies with the data from the API//
        let pokemonName = data.name; 
        let pokemonImg = data.sprites.front_default;

        //Implement error handling for the API call//
    } catch (error) {
        console.error(`Error:`, error);
    }
}

getPokemonData();

