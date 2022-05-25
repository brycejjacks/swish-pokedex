const userPokemonList = [
  {
    id: 1,
    name: "bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["grass", "poison"],
    abilities: ["overgrow", "chlorophyll"],
    flavor_text:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 },
    ],
  },
  {
    id: 2,
    name: "kindaCoolGuy",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    types: ["fire", "poison"],
    abilities: ["overgrow", "chlorophyll"],
    flavor_text:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 },
    ],
  },
  {
    id: 3,
    name: "coolGuy",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    types: ["grass", "physic"],
    abilities: ["overgrow", "chlorophyll"],
    flavor_text:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 },
    ],
  },
];


// const iconForPokemon = {
//     fire:
//     water:
// }





fetch("http://localhost:3000/api/pokedex")
  .then((res) => res.json())
  .then((pokeList) => {
    const pokedex = document.getElementById("pokedex");
    console.log("res...", pokeList);
    const pokemonHTMLString = pokeList
      .map(
        (pokedude) => `
        <li class="card" onclick="updateInventory()" id="triggerButton" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="card-number">${pokedude.id}</div>
            <img class="card-image" src="${pokedude.image}"/>
            <h2 class="card-title"> ${pokedude.name}</h2>
            <p class="card-subtitle">Type: ${pokedude.type}</p>
           
        </li>
    `
      )
      .join("");
    pokedex.innerHTML = pokemonHTMLString;
  });
// open cart on click pokemon to cart
document.getElementById("pokeimg").addEventListener("click", function () {
    document.querySelector(".cart-hide").classList.remove("cart-hide");
    document.getElementById('inventorybutton').classList.add('cart-hide');
    getUserPokemonList();
});

// close side bar on click

document.getElementById("xbutton").addEventListener("click", function () {
  console.log("hello");
  document.getElementById('userPokemonList').innerHTML = ''
  document.querySelector(".cart-container").classList.add("cart-hide");
  document.getElementById('inventorybutton').classList.remove('cart-hide');
});


// onclick="getDetails(${pokedude.id})"

function getDetails(id) {
  fetch(`localhost:3000/api/pokemon/${id}`)
    .then(res.json())
    .then((res) => {
      `
                <h1>${res.name}</h1>
                <>
            `;
    });
}


function getUserPokemonList() {
    //example
    // fetch(`localhost:3000/api/getUserPokemonList/${userId}`).then(res => res.json()).then((userlist) => {

    // })

    const userPokemonListUL = document.getElementById('userPokemonList');
    console.log(userPokemonListUL)

    userPokemonList.forEach((userPokemon) => {

        

        const userPokemonLI = document.createElement('li');
        userPokemonLI.classList.add('cardside', 'userPokemonLI');
        userPokemonLI.innerHTML = userPokemon.name;
        
        const userPokemonLIImage = document.createElement('img');
        userPokemonLIImage.src = userPokemon.image;
        
        userPokemonLI.appendChild(userPokemonLIImage)
        
        userPokemonListUL.appendChild(userPokemonLI);
    })
}
