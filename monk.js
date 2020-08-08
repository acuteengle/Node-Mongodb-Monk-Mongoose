const express = require("express");
const router = express.Router();
const db = require('monk')('localhost:27017/test');
const pokemonDataCollection = db.get('pokemon-data');

router.get('/get-data', (req, res, next) => {
    console.log("Received get-data request");

    pokemonDataCollection.find({})
        .then((docs) => {
            res.json(docs);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/insert', (req, res, next) => {
    console.log("Received insert request");
    
    const newPokemon = {
        name: req.body.name,
        type: req.body.type,
        level: req.body.level
    };

    pokemonDataCollection.insert(newPokemon)
        .then(() => {
            res.json('Pokemon inserted');
        })
        .catch((err) => {
            console.log(err);
        }); 
});

router.post('/update', (req, res, next) => {
    console.log("Received update request");

    const updatedPokemon = {
        name: req.body.name,
        type: req.body.type,
        level: req.body.level
    };

    const id = {
        "_id": req.body.id
    };

    // pokemonDataCollection.update({"_id": db.id(id)}, updatedPokemon);
    pokemonDataCollection.findOneAndUpdate(id, {$set: updatedPokemon})
        .then(() => {
            res.json('Pokemon updated');
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/delete', (req, res, next) => {
    console.log("Received delete request");
    
    const id = {
        "_id": req.body.id
    };

    // pokemonDataCollection.remove({"_id": db.id(id)});
    pokemonDataCollection.findOneAndDelete(id)
        .then(() => {
            res.json('Pokemon deleted');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;