import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    type: {type: String, required: true}
})

export const PokemonModel = mongoose.model('pokemon', pokemonSchema);