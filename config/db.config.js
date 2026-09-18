const { MongoClient } = require('mongodb');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

let _db;

async function startMongodb() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    _db = client.db('project1');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

function getDb() {
  if (!_db) {
    throw new Error('Database not initialized. Call startMongodb() first.');
  }
  return _db;
}

module.exports = { startMongodb, getDb };