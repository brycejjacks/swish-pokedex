const typeImg = {
    water: "./media/Pokemon_Type_Icon_Water.png",
    fire:"./media/Pokemon_Type_Icon_Fire.png",
    bug:"./media/Pokemon_Type_Icon_Bug.png",
    dark:"./media/Pokemon_Type_Icon_Dark.png",
    grass:"./media/Pokemon_Type_Icon_Grass.png",
    poison:"./media/Pokemon_Type_Icon_Poison.png",
    fighting:"./media/Pokemon_Type_Icon_Fighting.png",
    fairy:"./media/Pokemon_Type_Icon_Fairy.png",
    electric:"./media/Pokemon_Type_Icon_Electric.png",
    flying:"./media/Pokemon_Type_Icon_Flying.png",
    ghost:"./media/Pokemon_Type_Icon_Ghost.png",
    ground:"./media/Pokemon_Type_Icon_Ground.png",
    ice:"./media/Pokemon_Type_Icon_Ice.png",
    normal:"./media/Pokemon_Type_Icon_Normal.png",
    psychic:"./media/Pokemon_Type_Icon_Psychic.png",
    steel:"./media/Pokemon_Type_Icon_Steel.png",
    rock:"./media/Pokemon_Type_Icon_Rock.png",
    dragon:"./media/Pokemon_Type_Icon_Dragon.png",
}



// search bar 

// get value of input
let filterInput = document.getElementById('filterInput');

filterInput.addEventListener('keyup', filterNames);

function filterNames(){
  console.log(1)
  let filterValue = document.getElementById('filterInput').value.toUpperCase();
  console.log(filterValue)

  // let pokemonNames = document.getElementById('triggerButton');

  let li= document.querySelectorAll('.card')

  for (let i = 0; i < li.length; i++){
    let a = li[i].getElementsByTagName('h2')[0];
    console.log(a.innerHTML)
    
    if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = '';
    }
    else {
      li[i].style.display = 'none';
    }
  }
}

const bluelightImg = {
  image: ""
};

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
    types: ["grass", "psychic"],
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

fetch("http://localhost:3000/api/pokedex")
  .then((res) => res.json())
  .then((pokeList) => {
    const pokedex = document.getElementById("pokedex");
    console.log("res...", pokeList);
    const pokemonHTMLString = pokeList
      .map(
        (pokedude) => `
        <li class="card" id="triggerButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getDetails(${pokedude.id})">
            <div class="card-number">#${String(pokedude.id).padStart(3,0)}</div>
            <img class="card-image" src="${pokedude.image}"/>
            <h2 class="card-title"> ${pokedude.name}</h2>
            <p class="card-subtitle">
                ${mapTypes(pokedude.types).join('')}
            </p>
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
    document.querySelector(".cart-container").classList.add("slide");
    getUserPokemonList();
});

// close side bar on click

document.getElementById("xbutton").addEventListener("click", function () {
  // document.getElementById('userPokemonList').innerHTML = ''
  document.querySelector(".cart-container").classList.add("cart-hide");
  document.getElementById('inventorybutton').classList.remove('cart-hide');
});


// onclick="getDetails(${pokedude.id})"

function getDetails(id) {
  fetch(`http://localhost:3000/api/pokemon/${id}`)
    .then(res => res.json())
    .then((res) => {
        document.getElementById('PokeModalName').innerHTML = capitalizeFirstLetter(res.name);
        document.getElementById('detailsType').innerHTML = mapTypes(res.types).join('')
        document.getElementById('pokeAbilities').innerHTML = mapAbilities(res.abilities).join('')   
        document.getElementById('detailsId').innerHTML = `#${String(res.id).padStart(3,0)}`
        document.getElementById('detailsDescription').innerHTML = res.flavor_text
        document.getElementById('detailsPokemonImg').src = res.image
        document.getElementById('display-stats-hp').innerHTML = res.stats.find((obj) => obj.name === 'hp').value
        document.getElementById('display-stats-attack').innerHTML = res.stats.find((obj) => obj.name === 'attack').value
        document.getElementById('display-stats-defense').innerHTML = res.stats.find((obj) => obj.name === 'defense').value
        document.getElementById('display-stats-speed').innerHTML = res.stats.find((obj) => obj.name === 'speed').value
    });
}


function getUserPokemonList(id) {
    //example
    // fetch(`localhost:3000/api/getUserPokemonList/${id}`)
    // .then(res => res.json())
    // .then((userPokemon) => {

    // })

    const userPokemonListUL = document.getElementById('userPokemonList');
    console.log(userPokemonListUL)

         userPokemonList.forEach((userPokemon) => {

        

        const userPokemonLI = document.createElement('li');
        userPokemonLI.classList.add('cardside', 'userPokemonLI');
        userPokemonLI.innerHTML = userPokemon.name;
        
        const userPokemonLIImage = document.createElement('img');
        userPokemonLIImage.classList.add('pokemon-background')
        userPokemonLIImage.src = userPokemon.image;

        // const bluelight = document.createElement('img');
        // bluelight.classList.add('rotate-background')
        // bluelight.src = 

        
        userPokemonLI.appendChild(userPokemonLIImage);

        const typesUL = document.createElement('li');
        typesUL.classList.add('userListTypeIcon')
        typesUL.innerHTML = mapTypes(userPokemon.types);
        userPokemonLI.appendChild(typesUL);


        userPokemonListUL.appendChild(userPokemonLI);
    })
}



///// Helper functions
function mapAbilities(abilityArray) {
  return abilityArray.map(ability => {
      return `
         <li>${ability}</li>
      `
  })
}
function mapTypes(typesArray) {
  return typesArray.map(type => {
      return `
          <img class="typeIcon" src=${typeImg[type]} title=${type}>
      `
  })
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
