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

};

module.exports = {
    getAll,
};