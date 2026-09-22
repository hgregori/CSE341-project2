const { getDb } = require('../config/db.config');
const objectId = require('mongodb').ObjectId;

const getAllGames = async (req, res) => {
    try {
        const dishes = await getDb().collection('soulslike').find({}).toArray();

        res.status(200).json(dishes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getSingleGame = async (req,res) => {    
    try {
        const disheId = new objectId(req.params.id);
        const dishes = await getDb().collection('soulslike').find({ _id: disheId }).toArray();

        res.status(200).json(dishes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const createGame = async (req, res) => {
    try {
        const disheCreate = { 
            "title": req.body.title,
            "studio": req.body.studio,
            "releaseDate": req.body.releaseDate,
            "price": req.body.price
        }
        const response = await getDb().collection('soulslike').insertOne(disheCreate);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const updateGame = async (req, res) => {
    try {
        const disheId = new objectId(req.params.id);
        const disheUpdate = { 
            "title": req.body.title,
            "studio": req.body.studio,
            "releaseDate": req.body.releaseDate,
            "price": req.body.price
        }
        const response = await getDb().collection('soulslike').updateOne({_id: disheId}, { $set: disheUpdate});
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const deleteGame = async (req, res) => {
    try {
        const disheId = new objectId(req.params.id);
        const response = await getDb().collection('soulslike').deleteOne({_id: disheId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


module.exports = {
    getAllGames,
    getSingleGame, 
    createGame,
    updateGame,
    deleteGame
};