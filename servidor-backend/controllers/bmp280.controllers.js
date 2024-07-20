const Sensor = require('../models/bmp280');

const bmp280Controller = {};

bmp280Controller.addData = async (req, res) => {
    const { temperature, pressure, altitude } = req.body;
  
    // Crear un nuevo documento de datos del sensor
    const newBmp280Data = new Sensor({
      temperature,
      pressure,
      altitude
    });
  
    // Guardar en la base de datos
    newBmp280Data.save()
      .then(() => {
        res.status(201).send('Data saved successfully');
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error saving data');
      });
  };

  bmp280Controller.getData = async (req, res) => {
    Sensor.find()
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
      });
  };

module.exports = bmp280Controller;
