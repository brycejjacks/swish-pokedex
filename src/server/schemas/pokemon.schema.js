import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    types: [{type: String, required: true}],
    abilities: [{type: String, required: true}],
    flavor_text: {type: String, required: true},
    stats:[{type: mongoose.SchemaTypes.Mixed, required: true}]
})

export const PokemonModel = mongoose.model('Pokemon', pokemonSchema);