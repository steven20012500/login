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
    try{
      const sensor = await Sensor.find();
      res.json(sensor);
    }catch (error){
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ message: 'Error interno al obtener los datos' });
    }
  };

module.exports = bmp280Controller;
