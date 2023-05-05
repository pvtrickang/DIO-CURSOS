const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
   
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.types = types
    pokemon.type = type  
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

   
    
   

    return pokemon
    

    
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((Response) => Response.json())
        .then(convertPokeApiDetailToPokemon)
    
}

pokeApi.getPokemons = (offset, limite) => {  
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`
    return fetch(url)
    .then((Response) =>  Response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    }

