const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log("Mongoose DB is connected");
})
.catch((err) => {
    console.log(err);
});
const Schema = mongoose.Schema;

const pokemonTrainerDataSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    badges: Number,
    pokemon: String
}, {collection: 'trainer-data'});

const PokemonTrainerData = mongoose.model("PokemonTrainerData", pokemonTrainerDataSchema);

router.get('/get-data', (req, res, next) => {
    console.log("Received get-data request");

    const id = req.body.id;

    if (id){
        PokemonTrainerData.findById(id)
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        PokemonTrainerData.find({})
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

router.post('/insert', (req, res, next) => {
    console.log("Received insert request");
    
    const newPokemonTrainer = {
        name: req.body.name,
        age: req.body.age,
        badges: req.body.badges,
        pokemon: req.body.pokemon
    };

    const data = new PokemonTrainerData(newPokemonTrainer);
    data.save().then(() => {
        res.json('Pokemon Trainer inserted');
    });
});

router.post('/update', (req, res, next) => {
    console.log("Received update request");

    const id = req.body.id;

    const updatePokemonTrainer = {
        name: req.body.name,
        age: req.body.age,
        badges: req.body.badges,
        pokemon: req.body.pokemon
    };

    PokemonTrainerData.findByIdAndUpdate(id, updatePokemonTrainer, (err, doc) => {
        if (err){
            console.log(err);
        }
        else {
            res.json('Pokemon Trainer updated');
        }
    });
});

router.post('/delete', (req, res, next) => {
    console.log("Received delete request");
    
    const id = req.body.id;
    
    PokemonTrainerData.findByIdAndRemove(id, (err, doc) => {
        if (err){
            console.log(err);
        }
        else {
            res.json('Pokemon Trainer deleted');
        }
    });
});

module.exports = router;