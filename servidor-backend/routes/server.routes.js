const {Router} = require('express');
const router = Router();
const bmp280 = require('../controllers/bmp280.controllers');

router.post('/bmp280', bmp280.addData);

//router.get('/tareas-privadas', user.getTasksPrivadas);
module.exports = router;