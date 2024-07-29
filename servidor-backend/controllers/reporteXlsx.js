const XLSX = require('xlsx');
const BMP280 = require('../models/bmp280');
const DHT22 = require('../models/dht22');

const generateXlsReport = async () => {
  // Obtener datos de BMP280 y DHT22
  const bmp280Data = await BMP280.find().lean();
  const dht22Data = await DHT22.find().lean();

  // Crear hoja de datos para BMP280
  const bmp280Ws = XLSX.utils.json_to_sheet(bmp280Data);
  // Crear hoja de datos para DHT22
  const dht22Ws = XLSX.utils.json_to_sheet(dht22Data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, bmp280Ws, 'BMP280 Report');
  XLSX.utils.book_append_sheet(wb, dht22Ws, 'DHT22 Report');

  const filePath = 'report.xlsx';
  XLSX.writeFile(wb, filePath);

  return filePath;
};

module.exports = generateXlsReport;