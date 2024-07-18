const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dht22DataSchema = new Schema({
    temperature: Number,
    humidity: Number,
    timestamp: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Dht22', Dht22DataSchema);
