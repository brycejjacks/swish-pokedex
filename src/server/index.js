import express from "express";
import cors from "cors";
//import path from 'path';
import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto';

import fetch from "node-fetch";
import { PokemonModel } from "./schemas/pokemon.schema.js";


const PORT = 3000
const MONGO_URI = "mongodb://localhost:27017/swish-pokedex"

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
    PokemonModel.find().lean()
    .then(pokemons => res.json(pokemons))
    .catch(e => {
        res.sendStatus(500).json(e)
    })
})

app.listen(PORT, function (){
    console.log(`listening to port http://localhost:${PORT}`)
  });
  