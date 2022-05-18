import express from "express";
import cors from "cors";
//import path from 'path';
import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto';

import fetch from "node-fetch";
import { PokemonModel } from "./schemas/pokemon.schema.js";


const PORT = 3000
const MONGO_URI = "mongodb://127.0.0.1:27017/swish-pokedex"

const __dirname = path.resolve();
console.log(__dirname)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

const app = express();
app.use(cors());
app.use(express.json())

app.get('/api/pokedex', (req, res) => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemons = results.map((result) => {
            let pokemon = {
                name: result.name,
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', '),
                id: result.id
            }
            // UNCOMMENT NEXT LINE FOR SEED DATA 
            // new PokemonModel(pokemon).save().catch(e => console.log(e))
            return pokemon
        })
        res.json(pokemons)
    });
})

app.listen(PORT, function (){
    console.log(`listening to port http://localhost:${PORT}`)
  });
  