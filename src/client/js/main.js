
fetch('http://localhost:3000/api/pokedex').then(res => res.json()).then((pokeList) => {
    const pokedex = document.getElementById('pokedex');
    console.log('res...' , pokeList)
    const pokemonHTMLString = pokeList.
        map(
            (pokedude) => `
        <li class="card" onclick="updateInventory()">
            <div class="card-number">${pokedude.id}</div>
            <img class="card-image" src="${pokedude.image}"/>
            <h2 class="card-title"> ${pokedude.name}</h2>
            <p class="card-subtitle">Type: ${pokedude.type}</p>
             <button type="button" class="btn btn-primary" id="triggerButton" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
             
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
})
// open cart on click pokemon to cart 
document.getElementById('pokeimg').addEventListener('click', function() {
    document.querySelector('.cart-hide').classList.remove('cart-hide');
    // document.querySelector('.cart-hide').classList.add('slide');
});

// close side bar on click

document.getElementById('xbutton').addEventListener('click', function() {
    console.log('hello')
    document.querySelector('.cart-container').classList.add('cart-hide');
    // document.querySelector('.cart-hide').style.display = 'none';
});

// Array to catch pokemon
const cartInv = [];

// Update Inventory

// inventory card variable
let sideCards = document.getElementById('renderedInventory');



// onclick="getDetails(${pokedude.id})"

function getDetails(id) {
    fetch(`localhost:3000/api/pokemon/${id}`).then(res.json()).then(
        (res) => {
            `
                <h1>${res.name}</h1>
                <>
            `
        }
    )
    }




    
function updateInventory(){
    sideCards.innerHTML = " ";
    cartInv.forEach(pokedude => {
        sideCards.innerHTML += `
        <li class="card">
        <img class="card-image" src="${pokedude.image}"/>
        </li>
        ` 
    })   
}


    
    
    
    
    



