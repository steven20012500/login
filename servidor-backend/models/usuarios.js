const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@ups\.edu\.ec$/
      },
      password: {
        type: String,
        required: true,
        minlength: 6
      },
      role: {
        type: String,
        enum: ['operador', 'administrador'],
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    });

    module.exports = mongoose.model('Usuario', usuarioSchema);