#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// Wi-Fi credentials
const char* ssid = "WEMAZEN";
const char* password = "mazen5555";

// Web server on port 80
ESP8266WebServer server(80);

// Global variables for simulated sensor data
float voltage = 0;
float current = 0;
float temperature = 0; // Added for temperature
float humidity = 0;    // Added for humidity

void setup() {
  // Start serial communication
  Serial.begin(9600);

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

  // Generate simulated data every loop
  voltage = random(300, 422) / 100.0; // Simulate voltage between 3.00V to 4.22V
  current = random(10, 200) / 10.0; // Simulate current between 1.0A to 20.0A
  temperature = random(150, 350) / 10.0; // Simulate temperature between 15.0°C to 35.0°C
  humidity = random(200, 800) / 10.0;    // Simulate humidity between 20.0% to 80.0%

  delay(1000); // Delay to simulate sensor refresh rate
}

// Handle the root (dashboard) endpoint
void handleDashboard() {
  String html = "<html><body>";
  html += "<h1>Sensor Dashboard (Demo Data)</h1>";
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
  // Simulate sensor data
  String json = "{\"voltage\": " + String(voltage) + 
                 ", \"current\": " + String(current) + 
                 ", \"temperature\": " + String(temperature) + 
                 ", \"humidity\": " + String(humidity) + "}";
  
  // Set CORS headers
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Send JSON response with the sensor data
  server.send(200, "application/json", json);
}
