// global data
const typeImg = {
  water: "./media/Pokemon_Type_Icon_Water.png",
  fire: "./media/Pokemon_Type_Icon_Fire.png",
  bug: "./media/Pokemon_Type_Icon_Bug.png",
  dark: "./media/Pokemon_Type_Icon_Dark.png",
  grass: "./media/Pokemon_Type_Icon_Grass.png",
  poison: "./media/Pokemon_Type_Icon_Poison.png",
  fighting: "./media/Pokemon_Type_Icon_Fighting.png",
  fairy: "./media/Pokemon_Type_Icon_Fairy.png",
  electric: "./media/Pokemon_Type_Icon_Electric.png",
  flying: "./media/Pokemon_Type_Icon_Flying.png",
  ghost: "./media/Pokemon_Type_Icon_Ghost.png",
  ground: "./media/Pokemon_Type_Icon_Ground.png",
  ice: "./media/Pokemon_Type_Icon_Ice.png",
  normal: "./media/Pokemon_Type_Icon_Normal.png",
  psychic: "./media/Pokemon_Type_Icon_Psychic.png",
  steel: "./media/Pokemon_Type_Icon_Steel.png",
  rock: "./media/Pokemon_Type_Icon_Rock.png",
  dragon: "./media/Pokemon_Type_Icon_Dragon.png",
};
let userPokemonList = [];
let displayedPokemonsInfo = {}
const filterInput = document.getElementById("filterInput");
const pokeballInventoryCloser = document.getElementById("xbutton");
const pokeballInventoryOpener = document.getElementById("pokeimg");
const bluelightImg = {
  image: "",
};

// main
getAllPokemon();
log(localStorage.getItem('userPokemonList'))
localStorage.getItem('userPokemonList') ? userPokemonList = JSON.parse(localStorage.getItem('userPokemonList')) : void
filterInput.addEventListener("keyup", filterPokedexByName);
pokeballInventoryOpener.addEventListener("click", openInventorySideMenu);
pokeballInventoryCloser.addEventListener("click", closeInventorySideMenu);

// search bar
// get value of input
function filterPokedexByName() {
  let filterValue = document.getElementById("filterInput").value.toUpperCase();
  log(filterValue);

  let li = document.querySelectorAll(".card");

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("h2")[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// event callbacks
function catchEm() {
  userPokemonList.push(displayedPokemonsInfo)
  localStorage.setItem('userPokemonList', JSON.stringify(userPokemonList))
}
function fiterByType(type) {
  fetch(`http://localhost:3000/api/pokedex/type/${type}`)
    .then((res) => res.json())
    .then((partialPokedex) => renderPokedex(partialPokedex));
}
function getAllPokemon() {
  fetch("http://localhost:3000/api/pokedex").then((res) => res.json())
  .then((pokeList) => {
    renderPokedex(pokeList);
  });
}
function getDetails(id) {
  fetch(`http://localhost:3000/api/pokemon/${id}`)
    .then((res) => res.json())
    .then((res) => {
      displayedPokemonsInfo = res
      document.getElementById("PokeModalName").innerHTML =
        capitalizeFirstLetter(res.name);
      document.getElementById("detailsType").innerHTML = mapTypes(
        res.types
      ).join("");
      document.getElementById("pokeAbilities").innerHTML = mapAbilities(
        res.abilities
      ).join("");
      document.getElementById("detailsId").innerHTML = `#${String(
        res.id
      ).padStart(3, 0)}`;
      document.getElementById("detailsDescription").innerHTML = res.flavor_text;
      document.getElementById("detailsPokemonImg").src = res.image;
      document.getElementById("display-stats-hp").innerHTML = res.stats.find(
        (obj) => obj.name === "hp"
      ).value;
      document.getElementById("display-stats-attack").innerHTML =
        res.stats.find((obj) => obj.name === "attack").value;
      document.getElementById("display-stats-defense").innerHTML =
        res.stats.find((obj) => obj.name === "defense").value;
      document.getElementById("display-stats-speed").innerHTML = res.stats.find(
        (obj) => obj.name === "speed"
      ).value;
    });
}
function getUserPokemonList(id) {
  const userPokemonListUL = document.getElementById("userPokemonList");
  userPokemonListUL.innerHTML = ''
  userPokemonList.forEach((userPokemon) => {
    const userPokemonLI = document.createElement("li");
    userPokemonLI.classList.add("cardside", "userPokemonLI");
    userPokemonLI.innerHTML = userPokemon.name;

    const userPokemonLIImage = document.createElement("img");
    userPokemonLIImage.classList.add("pokemon-background");
    userPokemonLIImage.src = userPokemon.image;

    // const bluelight = document.createElement('img');
    // bluelight.classList.add('rotate-background')
    // bluelight.src =

    userPokemonLI.appendChild(userPokemonLIImage);

    const typesUL = document.createElement("li");
    typesUL.classList.add("userListTypeIcon");
    typesUL.innerHTML = mapTypes(userPokemon.types);
    userPokemonLI.appendChild(typesUL);

    userPokemonListUL.appendChild(userPokemonLI);
  });
}
// open cart on click pokemon to cart
function openInventorySideMenu() {
  document.querySelector(".cart-hide").classList.remove("cart-hide");
  document.getElementById("inventorybutton").classList.add("cart-hide");
  document.querySelector(".cart-container").classList.add("slide");
  getUserPokemonList();
};
// close side bar on click
function closeInventorySideMenu() {
  //document.getElementById('userPokemonList').innerHTML = ''
  document.querySelector(".cart-container").classList.add("cart-hide");
  document.getElementById("inventorybutton").classList.remove("cart-hide");
};
////// HELPER FUNCTIONS
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function mapAbilities(abilityArray) {
  return abilityArray.map((ability) => {
    return `
         <li>${ability}</li>
      `;
  });
}
function mapTypes(typesArray) {
  return typesArray.map((type) => {
    return `
          <img class="typeIcon" src=${typeImg[type]} title=${type}>
      `;
  });
}
function renderPokedex(pokedex) {
  const pokedexDiv = document.getElementById("pokedex");
  pokedexDiv.innerHTML = pokedex
    .map(
      (pokemon) => `
    <li class="card" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getDetails(${
      pokemon.id
    })">
      <div class="card-number">#${String(pokemon.id).padStart(3, 0)}</div>
      <img class="card-image" src="${pokemon.image}"/>
      <h2 class="card-title"> ${pokemon.name}</h2>
      <p class="card-subtitle">
          ${mapTypes(pokemon.types).join("")}
      </p>
    </li>
    `
    )
    .join("");
}
function log(string) {
  console.log(string)
}