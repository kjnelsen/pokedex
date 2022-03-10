let pokemonJson = '';
const localStorage = window.localStorage;
let pokemonRaw = '';

const fetchPokemon = async () => {
    let inputValue = document.getElementById('pokedexSearch').value;
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputValue.toLowerCase());
    pokemonRaw = await response.text();
    pokemonJson = JSON.parse(pokemonRaw);
    renderPokemon();
};

const renderPokemon = () => {

    const name = document.getElementById('pokemonName');
    name.innerText = '#' + pokemonJson.id + ' : ' + pokemonJson.name;
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
    localStorage.setItem(localStorage.getItem('index'), pokemonRaw)
    const carouselToUpdate = 'carousel' + localStorage.getItem('index');
    const row = document.getElementById('pokemonCarousel');
    const imageTag = '<img src= ' + pokemonJson.sprites.front_default + ' id=' + carouselToUpdate + ' onclick=loadPoke(' + localStorage.getItem('index') + ');>';
    row.innerHTML += imageTag;
    localStorage.setItem(carouselToUpdate, imageTag);

    const newIndex = parseInt(localStorage.getItem('index')) + 1;
    localStorage.setItem('index', newIndex.toString());
}

const loadPoke = (index) => {
    pokemonRaw = localStorage.getItem(index);
    pokemonJson = JSON.parse(pokemonRaw);
    renderPokemon();
}

const loadCarousel = () => {
    if(localStorage.getItem('index') === null)
        localStorage.setItem('index', '0');

    const row = document.getElementById('pokemonCarousel');
    for(let i = 0; i < parseInt(localStorage.getItem('index')); i++)
    {
        row.innerHTML += localStorage.getItem('carousel' + i.toString());
    }
}

const clearCarousel = () => {
    localStorage.clear();
    localStorage.setItem('index', '0');
    const row = document.getElementById('pokemonCarousel');
    row.innerHTML = '';
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