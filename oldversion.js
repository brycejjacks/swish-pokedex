const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${1}`;
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            const pokemon = {};
            pokemon['name'] = data.name;
            pokemon['id'] = data.id;
            pokemon['image'] = data.sprites['front_default']
            pokemon['type'] = data.types
                // .map((type) => type.type.name)
                // .join(', ')
            console.log(pokemon);
        })
}


fetchPokemon()