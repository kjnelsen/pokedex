let savedPokemon = [];
let saveCounter = 0;
let saveLimit = 5;
let pokemonJson = '';

const fetchPokemon = async () => {
    let inputValue = document.getElementById('pokedexSearch').value;
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputValue.toLowerCase());
    pokemonJson = await response.json();
    renderPokemon();
};

const renderPokemon = () => {

    const name = document.getElementById('pokemonName');
    name.innerText = pokemonJson.name;
    const image = document.getElementById('pokemonSprite');
    image.src = pokemonJson.sprites.front_default;
    image.hidden = false;

    getStats();
    const saveButton = document.getElementById('saveButton');
    const shinyButton = document.getElementById('shinyButton');
    saveButton.hidden = false;
    shinyButton.hidden = false;

}

const getStats = () => {
    let stats = document.getElementById('pokeStats');
    let statsText = '';
    const statsArr = pokemonJson.stats;
    statsArr.forEach(s => {
        statsText += s.stat.name + ' : ' + s.base_stat + '\n';
    })
    stats.innerText = statsText;
}

const swapSprite = () => {
    const image = document.getElementById('pokemonSprite');
    if (image.src === pokemonJson.sprites.front_default)
        image.src = pokemonJson.sprites.back_default;
    else if (image.src === pokemonJson.sprites.front_shiny)
        image.src = pokemonJson.sprites.back_shiny;
    else if (image.src === pokemonJson.sprites.back_default)
        image.src = pokemonJson.sprites.front_default;
    else if (image.src === pokemonJson.sprites.back_shiny)
        image.src = pokemonJson.sprites.front_shiny;
}

const savePoke = () => {
    savedPokemon[saveCounter] = pokemonJson;
    const carouselToUpdate = 'carousel' + saveCounter.toString();
    saveCounter++;
    if(saveCounter >= saveLimit)
        saveCounter = 0;

    const carousel = document.getElementById(carouselToUpdate);
    carousel.src = pokemonJson.sprites.front_default;
}

const loadPoke = (index) => {
    pokemonJson = savedPokemon[index];
    renderPokemon();
}

const getShiny = () => {
    const image = document.getElementById('pokemonSprite');
    if (image.src === pokemonJson.sprites.front_default)
        image.src = pokemonJson.sprites.front_shiny;
    else if (image.src === pokemonJson.sprites.back_default)
        image.src = pokemonJson.sprites.back_shiny;
    else if (image.src === pokemonJson.sprites.front_shiny)
        image.src = pokemonJson.sprites.front_default;
    else if (image.src === pokemonJson.sprites.back_shiny)
        image.src = pokemonJson.sprites.back_default;

}