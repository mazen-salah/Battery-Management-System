// Function to fetch sensor data from the ESP8266
async function fetchSensorData() {
    try {
      const response = await fetch('http://<ESP8266_IP>/data'); // Replace <ESP8266_IP> with your ESP8266's IP address
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Update the HTML elements with the latest data
      document.getElementById('temperature-value').textContent = `${data.temperature.toFixed(2)} °C`;
      document.getElementById('humidity-value').textContent = `${data.humidity.toFixed(2)} %`;
  
      // Update the overview cards with the new data
      document.getElementById('voltage-practical').textContent = `${data.voltage.toFixed(2)}V`;
      document.getElementById('current-practical').textContent = `${data.current.toFixed(2)}A`;
  
      // Update charts if needed (example, you might need to add more logic)
      updateCharts(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  // Function to update charts
  function updateCharts(data) {
    // Update the voltage overview chart
    contexts.voltageOverview.data.datasets[0].data = [data.voltage, 13.0, 0.2];
    contexts.voltageOverview.update();
  
    // Update the current overview chart
    contexts.currentOverview.data.datasets[0].data = [data.current, 5.0, 0.2];
    contexts.currentOverview.update();
  
    // Update the voltage history chart
    contexts.voltageHistory.data.datasets[0].data = data.voltageHistory;
    contexts.voltageHistory.update();
  
    // Update the current history chart
    contexts.currentHistory.data.datasets[0].data = data.currentHistory;
    contexts.currentHistory.update();
  }
  
  // Fetch data every 10 seconds
  setInterval(fetchSensorData, 10000);
  
  // Initial fetch
  fetchSensorData();
  