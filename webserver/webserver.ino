#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Wire.h>
#include <Adafruit_AHTX0.h>

// Wi-Fi credentials
const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";

// Web server on port 80
ESP8266WebServer server(80);

// Constants for voltage and current measurement
const int adcPin = A0;                   // ADC pin for voltage measurement
// R1 (10kΩ) is connected between the input voltage (up to 5V) and the A0 pin.
const float R1 = 10000.0;                // Resistor R1 value (10kΩ) for voltage divider
// R2 (6.8kΩ) is connected between the A0 pin and GND.
const float R2 = 6800.0;                 // Resistor R2 value (6.8kΩ) for voltage divider
const float vRef = 3.3;                  // Reference voltage for ESP8266 (3.3V)
const float currentSenseResistor = 0.1;  // Known resistor value for current sensing (in Ohms)

// Sensor object for AHT21B
// VCC to 3.3V.
// GND to GND.
// SDA to D2GPIO 4).
// SCL to D1 (or GPIO 5).
Adafruit_AHTX0 aht;

// Global variables for sensor data
float voltage = 0;
float current = 0;
float temperature = 0;
float humidity = 0;

void setup() {
  // Start serial communication
  Serial.begin(9600);

  // Initialize I2C communication and AHT21B sensor
  if (!aht.begin()) {
    Serial.println("Failed to initialize AHT21B sensor!");
    while (1)
      ;
  }
  Serial.println("AHT21B sensor initialized.");

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Wi-Fi connected, print the local IP
  Serial.println("");
  Serial.println("WiFi connected!");
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());  // Print the local IP address

  // Define web server routes
  server.on("/", handleDashboard);
  server.on("/data", handleSensorData);

  server.begin();
  Serial.println("Web server started.");
}

void loop() {
  // Handle incoming client requests
  server.handleClient();

  // Read the ADC value and convert it to actual voltage
  int adcValue = analogRead(adcPin);
  float adcVoltage = (adcValue / 1023.0) * vRef;

  // Calculate the input voltage (scaled to 5V max using the voltage divider)
  voltage = adcVoltage / (R2 / (R1 + R2));

  // Calculate the current using Ohm's Law: I = V / R
  current = voltage / currentSenseResistor;

  // Get temperature and humidity from the AHT21B sensor
  sensors_event_t humidityEvent, tempEvent;
  aht.getEvent(&humidityEvent, &tempEvent);  // Populate events with data

  temperature = tempEvent.temperature;
  humidity = humidityEvent.relative_humidity;

  // Print sensor data for debugging
  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print(" V, Current: ");
  Serial.print(current);
  Serial.print(" A, Temperature: ");
  Serial.print(temperature);
  Serial.print(" °C, Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
}

// Handle the root (dashboard) endpoint
void handleDashboard() {
  String html = "<html><body>";
  html += "<h1>Sensor Dashboard (Real Data)</h1>";
  html += "<p><a href='/data'>Get Sensor Data</a></p>";
  html += "<p>Voltage: " + String(voltage) + " V</p>";
  html += "<p>Current: " + String(current) + " A</p>";
  html += "<p>Temperature: " + String(temperature) + " °C</p>";
  html += "<p>Humidity: " + String(humidity) + " %</p>";
  html += "</body></html>";

  server.send(200, "text/html", html);
}

// Handle the sensor data endpoint
void handleSensorData() {
  // Create JSON data with the current sensor readings
  String json = "{\"voltage\": " + String(voltage) + ", \"current\": " + String(current) + ", \"temperature\": " + String(temperature) + ", \"humidity\": " + String(humidity) + "}";

  // Set CORS headers
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");

  // Send JSON response with the sensor data
  server.send(200, "application/json", json);
}
