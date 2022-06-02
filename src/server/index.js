import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PokemonModel } from "./schemas/pokemon.schema.js";
import { UserModel } from "./schemas/user.schema.js";


const PORT = 3000
const MONGO_URI = "mongodb://127.0.0.1:27017/swish-pokedex"

const __dirname = path.resolve();
console.log(__dirname)
const clientPath = path.join(__dirname, 'src/client')

const saltRounds = 10;
const access_secret = '1234567890'

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static(clientPath))

app.get('/api/pokedex', (req, res) => {
    PokemonModel.find({}, '-flavor_text -abilities -stats').lean()
    .then(pokemons => res.json(pokemons))
    .catch(e => {
        res.sendStatus(500).json(e)
    })
})
app.get('/api/pokedex/name/:name', (req, res) => {
  const regex = new RegExp(req.params.name, 'i') // i for case insensitive
  PokemonModel.find({name: {$regex: regex}}, '-flavor_text -abilities -stats').lean()
  .then(pokemons => res.json(pokemons))
  .catch(e => {
      res.sendStatus(500).json(e)
  })
})
app.get('/api/pokedex/type/:type', (req, res) => {
  PokemonModel.find({types: req.params.type}, '-flavor_text -abilities -stats').lean()
  .then(pokemons => res.json(pokemons))
  .catch(e => {
      res.sendStatus(500).json(e)
  })
})
app.get('/api/pokemon/:id', (req, res) => {
  PokemonModel.findOne({id: req.params.id}).lean()
  .then(pokemons => res.json(pokemons))
  .catch((e) => {
      res.sendStatus(500).json(e)
  })
})
app.post('/api/sign-in', async function(req, res) {
  const {username, password} = req.body
  UserModel.findOne({username}).then(user => {
    bcrypt.compare(password, `${user?.password}`, function(err, result) {
      if (result) {
        const accessToken = jwt.sign({user}, access_secret)
        res.cookie('jwt', accessToken, {
          httpOnly: true,
          maxAge: 3600 * 1000,
        })
        res.json({data: {_id: user?._id, username: username, profilePic: user?.profilePic}})
      } else {
        res.sendStatus(502);
      }
    })
  })
})
app.post('/api/sign-up', async function(req, res) {
    const {username, password} = req.body
  
    const found = await UserModel.findOne({username}).lean()
    if (found){
      res.status(409)
      res.json({message: "Username is taken. Please insert a unique username."})
    } else {}
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
  
    const user = new UserModel({
      username,
      password: hash,
    });
    user.save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});
app.post('/api/vaid-username', function(req, res) {
    const {username} = req.body
  
    UserModel.findOne({ username }).lean().then(username => {
      if (username) {
        res.json({validUsername: false})
      } else {
        res.json({validUsername: true})
      }
    })
});
app.all('/*', (req, res) => {
  res.sendFile(clientPath)
})

app.listen(PORT, function (){
    console.log(`listening to port http://localhost:${PORT}`)
});


//// MIDDLEWARE
function authHandler(req, res, next) {
  const cookie = req.cookies["jwt"];
  console.log("auth", cookie);
  jwt.verify(
    cookie,
    process.env.ACCESS_SECRET,
    (err, result) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (result) {
        console.log(result.user, 'this is the user');
        req.user = result.user;
      }
      next();
    }
  );
}