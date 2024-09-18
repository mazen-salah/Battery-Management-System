# Battery Management System Dashboard

This repository contains code for a web-based dashboard to display and monitor simulated sensor data using an ESP8266 microcontroller. The data includes voltage, current, temperature, and humidity, simulating a real-world scenario.

## Project Overview

The project uses an ESP8266 microcontroller connected to a Wi-Fi network. It hosts a web server that serves a dashboard displaying simulated sensor readings. The web server provides two main endpoints:

- `/` - The main dashboard page.
- `/data` - A JSON endpoint that provides the latest sensor data.

## Features

- **Web Dashboard**: Displays simulated sensor data on a simple HTML page.
- **JSON Data Endpoint**: Supplies sensor data in JSON format for integration with other applications.
- **Simulated Sensor Data**: Simulates voltage, current, temperature, and humidity to mimic a real-world sensor setup.

## Hardware Required

- ESP8266 microcontroller (e.g., NodeMCU, Wemos D1 Mini)
- USB cable for programming and power

## Software Required

- Arduino IDE or PlatformIO for programming the ESP8266
- ESP8266 board package installed in the Arduino IDE

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/esp8266-sensor-dashboard.git
   ```

2. **Open the Project**

   Open the Arduino IDE and navigate to `File > Open`, then select the `esp8266-sensor-dashboard.ino` file from the cloned repository.

3. **Install Dependencies**

   Ensure the ESP8266 board package is installed in the Arduino IDE. Go to `Tools > Board > Board Manager`, search for "ESP8266", and install the package if not already installed.

4. **Update Wi-Fi Credentials**

   In the code, update the `ssid` and `password` variables with your Wi-Fi network credentials:

   ```cpp
   const char* ssid = "Your_SSID";
   const char* password = "Your_PASSWORD";
   ```

5. **Upload the Code**

   Select the appropriate ESP8266 board and port from the `Tools` menu, then upload the code to the ESP8266.

6. **Open the Serial Monitor**

   Open the Serial Monitor (`Tools > Serial Monitor`) and set the baud rate to `9600`. Wait for the ESP8266 to connect to your Wi-Fi network. It will display the local IP address once connected.

7. **Access the Dashboard**

   Open a web browser and navigate to the local IP address displayed in the Serial Monitor. You should see the sensor dashboard.

## Code Overview

### ESP8266 Code (`esp8266-sensor-dashboard.ino`)

- **Wi-Fi Connection**: Connects to the specified Wi-Fi network.
- **Web Server**: Hosts a web server on port 80.
  - **`/`**: Serves the main dashboard page.
  - **`/data`**: Provides sensor data in JSON format.
- **Simulated Sensor Data**: Generates random values for voltage, current, temperature, and humidity.

### Dashboard HTML

The dashboard displays:

- Voltage
- Current
- Temperature
- Humidity

The page includes a link to fetch sensor data in JSON format.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues or pull requests if you have improvements or fixes. Contributions are welcome!
