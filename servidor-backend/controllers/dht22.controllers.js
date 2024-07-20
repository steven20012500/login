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

module.exports = dht22Controller;
