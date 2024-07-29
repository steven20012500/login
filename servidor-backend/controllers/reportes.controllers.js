const express = require('express');
const generatePdfReport = require('../controllers/reportePDF');
const generateXlsReport = require('../controllers/reporteXlsx');

const reportesController = {};

// Ruta para descargar reporte XLS
reportesController.generateXlsReport = async (req, res) => {
    try {
      const filePath = await generateXlsReport();
      res.download(filePath);
    } catch (error) {
      res.status(500).json({ message: 'Error generando el reporte XLS' });
    }
  };
  
// Ruta para descargar reporte PDF
reportesController.generatePdfReport = async (req, res) => {
try {
    const filePath = await generatePdfReport();
    res.download(filePath);
} catch (error) {
    res.status(500).json({ message: 'Error generando el reporte PDF' });
}
};

module.exports = reportesController;

