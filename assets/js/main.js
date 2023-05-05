const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onCLick="selectPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    displayPopup(pokemon)
}

const displayPopup = (pokemon) => {

    const imagem = pokemon.sprites.other.dream_world.front_default
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const htmlString = `
    <div class = "popup"> 
    <div id="details">
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
    <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol>
</div>
    <img id="pokemon-img" src="${imagem}"
             alt="${pokemon.name}">
             <div id="data">
             <h4>Base stats</h4>
             <div id="stats">
             <div class="bar-inner pokeRadius">${pokemon.stats.map((name_stats)=>`<p class="${type} pokeRadius">${name_stats.stat.name}</p>`).join('')}</div>
             <div class="stat-desc pokeRadius">${pokemon.stats.map((base_stats)=>`<p class="${type} pokeRadius">${base_stats.base_stat}</p>`).join('')}</div>
               
   </div>
   <div class="stats-hw">
   <p class="${type}">Height:${(pokemon.height/10).toFixed(2)} m</p>
   <p class="${type}">Weight:${(pokemon.weight/10)} kg</p>
   <div>
   
</li>
    <button id="closeBtn" onClick="closePopup()">Close</button> 
    </div>
  </div>
</div>
    `
    pokemonList.innerHTML = htmlString + pokemonList.innerHTML
}

const closePopup = () => {
    const popup = document.querySelector('.popup')
    popup.parentElement.removeChild(popup)
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })

}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }


})