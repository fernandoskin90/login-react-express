const mongoose = require('mongoose');
const db = require('../config/keys');

const connectMongo = () => {
  mongoose
    .connect(db.mongoURI, {
      useNewUrlParser: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500 // Reconnect every 500ms,
    })
    .then(() => {
      console.log('Mongoose is ready');
    })
    .catch(console.error.bind(console, 'Mongoose connection error: '));
};

module.exports = connectMongo;
