let savedPokemon = [];
let saveCounter = 0;
let saveLimit = 5;
let frontSprite = '';
let backSprite = '';
let pokemonJson = '';

const fetchPokemon = async () => {
    let inputValue = document.getElementById('pokedexSearch').value;
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputValue.toLowerCase());
    pokemonJson = await response.json();
    renderPokemon();
};

const renderPokemon = () => {

    frontSprite = pokemonJson.sprites.front_default;
    backSprite = pokemonJson.sprites.back_default;

    const name = document.getElementById('pokemonName');
    name.innerText = pokemonJson.name;
    const image = document.getElementById('pokemonSprite');
    image.src = frontSprite;
    image.hidden = false;

    getStats();
    const saveButton = document.getElementById('saveButton');
    saveButton.hidden = false;
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
    if (image.src === frontSprite)
        image.src = backSprite;
    else
        image.src = frontSprite;
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