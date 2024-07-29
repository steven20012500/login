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


bmp280Controller.getDataRange= async (req, res) => {
  const range = req.params.range;
  let startDate;

  switch (range) {
    case 'day':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      break;
    case 'week':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      break;       
    case 'month':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'semester':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);
      break;
    case 'year':
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate = new Date(0); // All data if range is not specified
      break;
  }

  try {
    const data = await Sensor.find({ timestamp: { $gte: startDate } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = bmp280Controller;
