#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "DHTesp.h"

//credemciales Wifi
const char* ssid = "*****";
const char* password = "****";

const char* serverUrl = "http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/bmp280";
const char* dht22ServerUrl = "http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/dht22";

#define BMP_SCK  (13)
#define BMP_MISO (12)
#define BMP_MOSI (11)
#define BMP_CS   (10)

Adafruit_BMP280 bmp; // I2C
DHTesp dht; 

void setup() {
  Serial.begin(9600);
  delay(1000);
   // Inicializar conexión WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  while (!Serial) delay(100);   // wait for native USB
  Serial.println(F("BMP280 test"));

  unsigned status;
  status = bmp.begin(0x76);  // Initialize BMP280 sensor with address 0x76 (default)

  if (!status) {
    Serial.println(F("Could not find a valid BMP280 sensor, check wiring or "
                      "try a different address!"));
    Serial.print(F("SensorID was: 0x")); 
    Serial.println(bmp.sensorID(), 16);
    Serial.println(F("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085"));
    Serial.println(F("   ID of 0x56-0x58 represents a BMP 280,"));
    Serial.println(F("        ID of 0x60 represents a BME 280."));
    Serial.println(F("        ID of 0x61 represents a BME 680."));
    while (1) delay(10);
  }

  // Configure BMP280 settings
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temperature Oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure Oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby Time */
  // Inicializar el DHT22
  dht.setup(15, DHTesp::DHT22);
}

void loop() {
  float temperature = bmp.readTemperature();
  float pressure = bmp.readPressure();
  float altitude = bmp.readAltitude(1011.9); 
  String bmpJsonData = String("{\"temperature\":") + temperature +
                  String(",\"pressure\":") + pressure +
                  String(",\"altitude\":") + altitude + "}";

 // Inicializar cliente HTTP
  HTTPClient bmpHttp;
  bmpHttp.begin(serverUrl);
  bmpHttp.addHeader("Content-Type", "application/json");
  // Realizar solicitud POST al servidor
  int bmpHttpResponseCode  = bmpHttp.POST(bmpJsonData);

   if (bmpHttpResponseCode  > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(bmpHttpResponseCode);
    String bmpPayload  = bmpHttp.getString();
    Serial.println(bmpPayload);
  } else {
    Serial.print("Error en la solicitud HTTP BMP280: ");
    Serial.println(bmpHttpResponseCode);
  }
  bmpHttp.end();

  // Leer datos del DHT22
  TempAndHumidity dhtData = dht.getTempAndHumidity();
  float dhtTemperature = dhtData.temperature;
  float humidity = dhtData.humidity;

  // Crear objeto JSON con los datos del DHT22
  String dhtJsonData = String("{\"temperature\":") + dhtTemperature +
                       String(",\"humidity\":") + humidity + "}";

  // Inicializar cliente HTTP para DHT22
  HTTPClient dhtHttp;
  dhtHttp.begin(dht22ServerUrl);
  dhtHttp.addHeader("Content-Type", "application/json");

  // Realizar solicitud POST al servidor para DHT22
  int dhtHttpResponseCode = dhtHttp.POST(dhtJsonData);

  if (dhtHttpResponseCode > 0) {
    Serial.print("HTTP Response code DHT22: ");
    Serial.println(dhtHttpResponseCode);
    String dhtPayload = dhtHttp.getString();
    Serial.println(dhtPayload);
  } else {
    Serial.print("Error en la solicitud HTTP DHT22: ");
    Serial.println(dhtHttpResponseCode);
  }

  dhtHttp.end();

  // Print temperature in Celsius
  Serial.print(F("Temperature = "));
  Serial.print(bmp.readTemperature());
  Serial.println(F(" *C"));

  // Print pressure in Pascals
  Serial.print(F("Pressure = "));
  Serial.print(bmp.readPressure());
  Serial.println(F(" Pa"));

  // Print altitude in meters based on local pressure
  Serial.print(F("Approx altitude = "));
  Serial.print(bmp.readAltitude(1011.9)); /* Adjusted to local forecast! */
  Serial.println(F(" m"));

  Serial.println(); // Print a blank line for readability

   TempAndHumidity data = dht.getTempAndHumidity();
  //Mostramos los datos de la temperatura y humedad
  Serial.println("Temperatura: " + String(data.temperature, 2) + "°C");
  Serial.println("Humedad: " + String(data.humidity, 1) + "%");
  Serial.println("---");
  delay(1000);
  Serial.println(); // Print a blank line for readability

  delay(5000); // Esperar 5 segundos antes de enviar el siguiente dato
}
