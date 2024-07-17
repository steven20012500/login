const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

require('./database');
//require('dotenv').config();

app.use(express.json());
// app.use(morgan('dev')); monitoreo de peticiones
//cors para permitir la conexion con el front end
app.use(cors());
app.use('/api/',require('./routes/server.routes'));
app.use(bodyParser.json());


app.listen(PORT, () => {
//const crypto = require('crypto');
//console.log(crypto.randomBytes(64).toString('hex'));
//npm install dotenv  para instalar dotenv
// npm install dotenv --save-dev
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});



