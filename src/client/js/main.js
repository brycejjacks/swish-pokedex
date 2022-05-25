const typeImg = {
    water: "./media/Pokemon_Type_Icon_Water.png",
    fire:"./media/Pokémon_Fire_Type_Icon 2.png",
    bug:"./",
    dark:"",
    grass:"./media/Pokemon_Type_Icon_Grass.png",
    poison:"./media/Pokemon_Type_Icon_Poison.png",

}




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

function mapTypes(typesArray) {
    return typesArray.map(type => {
        return `
            <img class="typeIcon" src=${typeImg[type]} title=${type}>
        `
    })
}

fetch("http://localhost:3000/api/pokedex")
  .then((res) => res.json())
  .then((pokeList) => {
    const pokedex = document.getElementById("pokedex");
    console.log("res...", pokeList);
    const pokemonHTMLString = pokeList
      .map(
        (pokedude) => `
        <li class="card" onclick="updateInventory()">
            <div class="card-number">${pokedude.id}</div>
            <img class="card-image" src="${pokedude.image}"/>
            <h2 class="card-title"> ${pokedude.name}</h2>
            <p class="card-subtitle">
                ${mapTypes(pokedude.types)}
            </p>
            <button type="button" class="btn btn-primary" id="triggerButton" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
        </li>
    `
      )
      .join("");
    pokedex.innerHTML = pokemonHTMLString;
  });
// open cart on click pokemon to cart
document.getElementById("pokeimg").addEventListener("click", function () {
    document.querySelector(".cart-hide").classList.remove("cart-hide");
    getUserPokemonList();
  // document.querySelector('.cart-hide').classList.add('slide');
});

// close side bar on click

document.getElementById("xbutton").addEventListener("click", function () {
  console.log("hello");
  document.getElementById('userPokemonList').innerHTML = ''
  document.querySelector(".cart-container").classList.add("cart-hide");
  // document.querySelector('.cart-hide').style.display = 'none';
});

// Array to catch pokemon
const cartInv = [];

// Update Inventory

// inventory card variable
let sideCards = document.getElementById("renderedInventory");

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

function updateInventory() {
  sideCards.innerHTML = " ";
  cartInv.forEach((pokedude) => {
    sideCards.innerHTML += `
        <li class="card">
        <img class="card-image" src="${pokedude.image}"/>
        </li>
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
        userPokemonLI.classList.add('card', 'userPokemonLI');
        userPokemonLI.innerHTML = userPokemon.name;
        
        const userPokemonLIImage = document.createElement('img');
        userPokemonLIImage.src = userPokemon.image;
        userPokemonLI.appendChild(userPokemonLIImage)

        const typesUL = document.createElement('ul');
        typesUL.classList.add('userListTypeIcon')
        typesUL.innerHTML = mapTypes(userPokemon.types);
        userPokemonLI.appendChild(typesUL)

        userPokemonListUL.appendChild(userPokemonLI);
    })
}
