
let frontSprite = '';
let backSprite = '';
let pokemonJson = '';

const getInputValue = async () => {
    let inputValue = document.getElementById('pokedexSearch').value;
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + inputValue.toLowerCase());
    pokemonJson = await response.json();
    console.log(response);
    console.log(pokemonJson);

    frontSprite = pokemonJson.sprites.front_default;
    backSprite = pokemonJson.sprites.back_default;

    const image = document.getElementById('pokemonSprite');
    image.src = frontSprite;

    getStats();
};

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