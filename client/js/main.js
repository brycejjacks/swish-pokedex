
fetch('http://localhost:3000/api/pokedex').then(res => res.json()).then((pokeList) => {
    const pokedex = document.getElementById('pokedex');
    console.log('res...' , pokeList)
    const pokemonHTMLString = pokeList.
        map(
            (pokedude) => `
        <li class="card" onclick="grabPokemon()">
            <img class="card-image" src="${pokedude.image}"/>
            <h2 class="card-title">${pokedude.id}. ${pokedude.name}</h2>
            <p class="card-subtitle">Type: ${pokedude.type}</p>
             <button class"addButton"> click </button>
             
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
})
// Render pokemon to cart 



// Array to catch pokemon
const cartInv = [];

// On click for button/card

function grabPokemon(item) {
    console.log('hello');




    // const addPokemon = pokeList.find(pokedude => pokedude.image === item);


    // const alreadyOwned = cartInv.find(pokedude => pokedude.image === item);


    // if (alreadyOwned === alreadyOwned){
    //     alert('You have this pokemon');
    // }
    // else {
    //     cartInv.push(addPokemon);
    // }
    //     updateInventory();

    }
    










    // Upate Inventory
    // function updateInventory() {
    //     renderedInventory();
    // }
    
// function renderedInventory(){
//     sideBar.innerHTML = '';
//     cartInv.forEach(pokedude => {
//         sideBar.innerHTML += `
//         <li class="card">
//             <img class="card-image" src="${pokedude.image}"/>
//             <h2 class="card-title">${pokedude.id}. ${pokedude.name}</h2>
//             <p class="card-subtitle">Type: ${pokedude.type}</p>
//         </li>
        
//         ` 

//     })

// }



// const displayPokemon = (pokemon) => {
//     console.log(pokemon);
//     const pokemonHTMLString = pokemon
//         .map(
//             (pokedudes) => `
//         <li class="card">
//             <img class="card-image" src="${pokedudes.image}"/>
//             <h2 class="card-title">${pokedudes.id}. ${pokedudes.name}</h2>
//             <p class="card-subtitle">Type: ${pokedudes.type}</p>
//         </li>
//     `
//         )
//         .join('');
//     pokedex.innerHTML = pokemonHTMLString;
// };