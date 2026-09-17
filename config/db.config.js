const { MongoClient } = require('mongodb');
const env = require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;


async function startMongodb() {
  const client = new MongoClient(MONGODB_URI);

  try {
    const database = client.db('project1');
    const menus = database.collection('nihonryouri');
    console.log("Connected to MongoDB");
    return menus;
  } finally {
    await client.close();
  }
}

startMongodb().catch(console.dir);

module.exports = startMongodb;
