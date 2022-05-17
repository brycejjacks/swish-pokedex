# initialize pokemon collection

##### utilizing [pokeAPI](https://pokeapi.co/) the following code will loop through the first 150 pokemon(gen1) and insert them into a mogoose.model called PokemonModel<br>
<br>


### shape
##### each pokemon document has the following shape
    {
        "id": 1,
        "name": "bulbasaur",  
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",  
        "types": ["grass", "poison"],  
        "abilities": ["overgrow", "chlorophyll"],  "flavor_text": "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",  
        "stats": [
            {"name": "hp", "value": 45},
            {"name": "attack", "value": 49},
            {"name": "defense", "value": 49},
            {"name": "special-attack", "value": 65},{"name": "special-defense", "value": 65,{"name": "speed", "value": 45}
        ]
    }


### seed.js


    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then( (results) => {
        Promise.all(results.map(async (result) => {
            const flavor_text = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${result.id}`).then(res => res.json()).then(species => species.flavor_text_entries.find(entry => entry.version.name == "red").flavor_text).catch(e => console.log(e));
            let pokemon = {
                id: result.id,
                name: result.name,
                image: result.sprites['front_default'],
                types: result.types.map((type) => type.type.name), // if remove .join() then type = []
                abilities: result.abilities.map(ability => ability.ability.name),
                flavor_text: flavor_text.replace(/\f|\n/g," "),
                stats: result.stats.map(stat => {return {name: stat.stat.name, value: stat.base_stat}})
            }
            // UNCOMMENT NEXT LINE FOR SEED DATA 
            //new PokemonModel(pokemon).save().catch(e => console.log(e))
            return pokemon
        })).then((pokemons) => {/*PokemonModel.insertMany(pokemons);*/ return res.json(pokemons)})
        
    });

