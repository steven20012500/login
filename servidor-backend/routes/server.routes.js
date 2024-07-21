const {Router} = require('express');
const router = Router();
const bmp280 = require('../controllers/bmp280.controllers');
const dht22 = require('../controllers/dht22.controllers');
const usuarios = require('../controllers/usuarios.controllers');
const verifyToken = require('../controllers/authMiddleware');

router.post('/login', usuarios.login);
router.post('/bmp280', bmp280.addData);
router.post('/dht22', dht22.addData);
router.get('/bmp280', bmp280.getData);
router.get('/dht22', dht22.getData);    
router.post('/usuarios',verifyToken, usuarios.addUsuario);
router.get('/usuarios',verifyToken, usuarios.getUsuarios);
router.post('/usuarios/update-password',verifyToken, usuarios.updatePassword);
module.exports = router;