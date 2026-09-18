const { getDb } = require('../config/db.config');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const dishes = await getDb().collection('nihonryouri').find({}).toArray();

        res.status(200).json(dishes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getSingle = async (req,res) => {    
    try {
        const disheId = new objectId(req.params.id);
        const dishes = await getDb().collection('nihonryouri').find({ _id: disheId }).toArray();

        res.status(200).json(dishes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const createDishe = async (req, res) => {
    try {
        const disheCreate = { 
            "name": req.body.name,
            "ingredients": req.body.ingredients,
            "price": req.body.price,
            "available_sizes": req.body.available_sizes
        }
        const response = await getDb().collection('nihonryouri').insertOne(disheCreate);
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

const updateDishe = async (req, res) => {
    try {
        const disheId = new objectId(req.params.id);
        const disheUpdate = { 
            "name": req.body.name,
            "ingredients": req.body.ingredients,
            "price": req.body.price,
            "available_sizes": req.body.available_sizes
        }
        const response = await getDb().collection('nihonryouri').updateOne({_id: disheId}, { $set: disheUpdate});
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

const deleteDishe = async (req, res) => {
    try {
        const disheId = new objectId(req.params.id);
        const response = await getDb().collection('nihonryouri').deleteOne({_id: disheId});
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
    getAll,
    getSingle,
    createDishe,
    updateDishe,
    deleteDishe
};