const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bmp280Schema = new Schema({
    temperature: Number,
    pressure: Number,
    altitude: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bmp280', bmp280Schema);
