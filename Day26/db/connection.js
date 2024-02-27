const { MongoClient } = require('mongodb');

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017/mydatabase';

let db = null;

async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db();
}

function getDatabase() {
  if (!db) {
    throw new Error('Database is not connected');
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDatabase
};
