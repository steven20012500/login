const {Router} = require('express');
const router = Router();
const bmp280 = require('../controllers/bmp280.controllers');
const dht22 = require('../controllers/dht22.controllers');

router.post('/bmp280', bmp280.addData);
router.post('/dht22', dht22.addData);

//router.get('/tareas-privadas', user.getTasksPrivadas);
module.exports = router;