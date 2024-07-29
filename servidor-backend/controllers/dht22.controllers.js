const Dht22 = require('../models/dht22');

const dht22Controller = {};

dht22Controller.addData = async (req, res) => {
    const { temperature, humidity } = req.body;

    const newDht22Data = new Dht22({
      temperature,
      humidity
    });
    // Guardar en la base de datos
    newDht22Data.save()
    .then(() => res.status(201).send('DHT22 data saved successfully'))
    .catch(err => res.status(500).send('Error saving DHT22 data'));
  };
  
  dht22Controller.getData = async (req, res) => {
    try{
      const dht22 = await Dht22.find();
      res.json(dht22);
    }catch (error){
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ message: 'Error interno al obtener los datos' });
    }
  };

  dht22Controller.getDataRange= async (req, res) => {
    const range = req.params.range;
    let startDate;
  
    switch (range) {
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
      const data = await Dht22.find({ timestamp: { $gte: startDate } });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };  



module.exports = dht22Controller;
