#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "DHTesp.h"

//credemciales Wifi
const char* ssid = "******";
const char* password = "*******";

const char* loginUrl = "http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/login"; 
const char* serverUrl = "http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/bmp280";
const char* dht22ServerUrl = "http://ec2-18-191-140-37.us-east-2.compute.amazonaws.com:3000/api/dht22";

const char* username = "******"; 
const char* passwordU = "****"; 

#define BMP_SCK  (13)
#define BMP_MISO (12)
#define BMP_MOSI (11)
#define BMP_CS   (10)

Adafruit_BMP280 bmp; // I2C
DHTesp dht; 
String authToken; // Variable para almacenar el token

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

  //Iniciar sesión y obtener token
   if (login()) {
    Serial.println("Login successful.");
  } else {
    Serial.println("Login failed.");
    while (1) delay(10); // Detener el código si el login falla
  }

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

bool login(){
  // Inicializar cliente HTTP
  HTTPClient http;
  http.begin(loginUrl);
  http.addHeader("Content-Type", "application/json");

  // Crear el JSON para la solicitud de login
  String loginData = String("{\"username\":\"") + username +
                     String("\",\"password\":\"") + passwordU + 
                     String("\"}");

  // Realizar la solicitud POST de inicio de sesión
  int httpResponseCode = http.POST(loginData);

  if (httpResponseCode > 0) {
    String payload = http.getString();
    Serial.println("Login response payload: " + payload);
    
    // Extraer el token del payload (suponiendo que el token está en el campo "token")
    int tokenStart = payload.indexOf("token\":\"") + 8;
    int tokenEnd = payload.indexOf("\"", tokenStart);
    if (tokenStart > 8 && tokenEnd > tokenStart) {
      authToken = payload.substring(tokenStart, tokenEnd);
      Serial.println("Token received: " + authToken);
      http.end();
      return true;
    } else {
      Serial.println("Token not found in response.");
    }
  } else {
    Serial.print("Error in HTTP request: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  return false;
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
  bmpHttp.addHeader("Authorization", "Bearer " + authToken); // Agregar el token a la cabecera

  // Realizar solicitud POST al servidor
  int bmpHttpResponseCode  = bmpHttp.POST(bmpJsonData);

   if (bmpHttpResponseCode  > 0) {
    Serial.print("HTTP Response code BMP280: ");
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
  dhtHttp.addHeader("Authorization", "Bearer " + authToken); // Agregar el token a la cabecera

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

  // Imprimir temperatura en Celsius
  Serial.print(F("Temperature = "));
  Serial.print(bmp.readTemperature());
  Serial.println(F(" *C"));

  // Imprimir altitud en metros basada en la presión local
  Serial.print(F("Pressure = "));
  Serial.print(bmp.readPressure());
  Serial.println(F(" Pa"));

  // Print altitude in meters based on local pressure
  Serial.print(F("Approx altitude = "));
  Serial.print(bmp.readAltitude(1011.9));  /* Ajustada a la previsión local! */
  Serial.println(F(" m"));

  Serial.println();  // Imprimir una línea en blanco para legibilidad

   TempAndHumidity data = dht.getTempAndHumidity();
  //Mostramos los datos de la temperatura y humedad
  Serial.println("Temperatura: " + String(data.temperature, 2) + "°C");
  Serial.println("Humedad: " + String(data.humidity, 1) + "%");
  Serial.println("---");
  delay(1000);
  Serial.println(); // Imprimir una línea en blanco para legibilidad

  delay(5000); // Esperar 5 segundos antes de enviar el siguiente dato
}
