const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const assert = require('assert');
const { ObjectId } = require("bson");

const url = 'mongodb://localhost:27017';

router.get('/collections', (req, res, next) => {
    console.log("Received collections request");
    const mongo = new MongoClient(url, { useUnifiedTopology: true });
    mongo.connect((err, client) => {
        assert.equal(null, err);
        client.db('test').listCollections().toArray((err, info) => {
            assert.equal(null, err);
            res.json(info);
            client.close();
        });
    });
});

router.get('/get-data', (req, res, next) => {
    console.log("Received get-data request");
    const mongo = new MongoClient(url, { useUnifiedTopology: true });
    let results = [];
    mongo.connect((err, client) => {
        assert.equal(null, err);
        let cursor = client.db('test').collection('pokemon-data').find();
        cursor.forEach((doc, err)=> {
            assert.equal(null, err);
            results.push(doc);
        }, () => {
            res.json(results);
            client.close();
        });
    });
});

router.post('/insert', (req, res, next) => {
    console.log("Received insert request");
    const mongo = new MongoClient(url, { useUnifiedTopology: true });
    
    const newPokemon = {
        name: req.body.name,
        type: req.body.type,
        level: req.body.level
    };

    mongo.connect((err, client) => {
        assert.equal(null, err);
        client.db('test').collection('pokemon-data').insertOne(newPokemon, (err, result) => {
            assert.equal(null, err);
            res.json('Pokemon inserted');
            client.close();
        });
    });
});

router.post('/update', (req, res, next) => {
    console.log("Received update request");
    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    const updatedPokemon = {
        name: req.body.name,
        type: req.body.type,
        level: req.body.level
    };

    const id = req.body.id;

    mongo.connect((err, client) => {
        assert.equal(null, err);
        client.db('test').collection('pokemon-data').updateOne({"_id": ObjectId(id)}, {$set: updatedPokemon}, (err, result) => {
            assert.equal(null, err);
            res.json('Pokemon updated');
            client.close();
        });
    });

});

router.post('/delete', (req, res, next) => {
    console.log("Received delete request");
    const mongo = new MongoClient(url, { useUnifiedTopology: true });
    
    const id = req.body.id;
    mongo.connect((err, client) => {
        assert.equal(null, err);
        client.db('test').collection('pokemon-data').deleteOne({"_id": ObjectId(id)}, (err, result) => {
            assert.equal(null, err);
            res.json('Pokemon deleted');
            client.close();
        });
    });
});

module.exports = router;