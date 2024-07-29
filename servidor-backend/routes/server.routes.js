const {Router} = require('express');
const router = Router();
const bmp280 = require('../controllers/bmp280.controllers');
const dht22 = require('../controllers/dht22.controllers');
const usuarios = require('../controllers/usuarios.controllers');
const reportes = require('../controllers/reportes.controllers');
const verifyToken = require('../controllers/authMiddleware');

router.post('/login', usuarios.login);
router.post('/bmp280',verifyToken, bmp280.addData);
router.post('/dht22', verifyToken, dht22.addData);
router.get('/bmp280',verifyToken, bmp280.getData);
router.get('/dht22',verifyToken, dht22.getData);    
router.post('/usuarios',verifyToken, usuarios.addUsuario);
router.get('/usuarios',verifyToken, usuarios.getUsuarios);
router.post('/usuarios/update-password',verifyToken, usuarios.updatePassword);
router.delete('/usuarios/:username',verifyToken, usuarios.deleteUsuario);
router.put('/usuarios/:username',verifyToken, usuarios.updateUsuario);
router.get('/usuarios/:username',verifyToken, usuarios.getUserByUsername);
router.get('/download-xls',verifyToken, reportes.generateXlsReport);
router.get('/download-pdf',verifyToken, reportes.generatePdfReport);

module.exports = router;