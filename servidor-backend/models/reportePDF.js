const PDFDocument = require('pdfkit');
const fs = require('fs');
const BMP280 = require('../models/bmp280');
const DHT22 = require('../models/dht22');

const generatePdfReport = async () => {
  const bmp280Data = await BMP280.find().lean();
  const dht22Data = await DHT22.find().lean();

  const doc = new PDFDocument();
  const filePath = 'report.pdf';
  
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(25).text('BMP280 Report', { underline: true });
  bmp280Data.forEach((item, index) => {
    doc.fontSize(12).text(`Item ${index + 1}: Temp: ${item.temperature}, Pressure: ${item.pressure}, Time: ${item.timestamp}`);
  });

  doc.addPage().fontSize(25).text('DHT22 Report', { underline: true });
  dht22Data.forEach((item, index) => {
    doc.fontSize(12).text(`Item ${index + 1}: Temp: ${item.temperature}, Humidity: ${item.humidity}, Time: ${item.timestamp}`);
  });

  doc.end();

  return filePath;
};
module.exports = {
  generatePdfReport
};