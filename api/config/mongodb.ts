const mongoose = require('mongoose')

require('dotenv').config();

const MONGO_URL = process.env;

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection
connection.on('error', console.error)
connection.once('open', () => {
  console.log('Connected to mongod server')
});


module.exports = connection;