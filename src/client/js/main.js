
fetch('http://localhost:3000/api/pokedex').then(res => res.json()).then((pokeList) => {
    const pokedex = document.getElementById('pokedex');
    console.log('res...' , pokeList)
    const pokemonHTMLString = pokeList.
        map(
            (pokedude) => `
        <li class="card">
             <div class="card-number">${pokedude.id}</div>
            <img class="card-image" src="${pokedude.image}"/>
            <h2 class="card-title"> ${pokedude.name}</h2>
           
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
})





// const displayPokemon = (pokemon) => {
//     console.log(pokemon);
//     const pokemonHTMLString = pokemon
//         .map(
//             (pokedudes) => `
//         <li class="card">
//             <img class="card-image" src="${pokedudes.image}"/>
//             <h2 class="card-title"> ${pokedudes.name}</h2>
//             <p class="card-subtitle">Type: ${pokedudes.type}</p>
//         </li>
//     `
//         )
//         .join('');
//     pokedex.innerHTML = pokemonHTMLString;
// };