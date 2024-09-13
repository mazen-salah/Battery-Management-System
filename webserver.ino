#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_AHTX0.h>

// Wi-Fi credentials
const char* ssid = "your-ssid";
const char* password = "your-password";

// Web server on port 80
ESP8266WebServer server(80);

// Initialize AHT21B sensor
Adafruit_AHTX0 aht;

// Global variables for sensor data
float voltage = 0;
float current = 0;
float temperature = 0;
float humidity = 0;

void setup() {
  // Start serial communication
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected!");

  // Initialize AHT sensor
  if (!aht.begin()) {
    Serial.println("Failed to initialize AHT sensor!");
    while (1) delay(10);
  }

  // Define web server routes
  server.on("/", handleDashboard);
  server.on("/data", handleSensorData);

  server.begin();
  Serial.println("Web server started.");
}

void loop() {
  // Handle incoming client requests
  server.handleClient();
}

// Handle the root (dashboard) endpoint
void handleDashboard() {
  String html = "<html><body>";
  html += "<h1>Sensor Dashboard</h1>";
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
  // Read sensor data
  voltage = analogRead(A0) * (3.3 / 1024.0);
  current = analogRead(A1) * (5.0 / 1024.0);

  sensors_event_t humidityEvent, tempEvent;
  aht.getEvent(&humidityEvent, &tempEvent);
  temperature = tempEvent.temperature;
  humidity = humidityEvent.relative_humidity;

  // Send JSON response
  String json = "{\"voltage\": " + String(voltage) + ", \"current\": " + String(current) + ", \"temperature\": " + String(temperature) + ", \"humidity\": " + String(humidity) + "}";
  server.send(200, "application/json", json);
}
