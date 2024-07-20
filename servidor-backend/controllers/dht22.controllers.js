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
    Dht22.find()
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
      });
  };

module.exports = dht22Controller;
