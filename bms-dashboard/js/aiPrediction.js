async function fetchAiPrediction() {
    const voltage = document.getElementById('theoretical-voltage').value;
    const temperature = document.getElementById('temperature-value').textContent.replace('°C', '').trim();
    const humidity = document.getElementById('humidity-value').textContent.replace('%', '').trim();
  
    const data = {
      Voltage: parseFloat(voltage),
      Temperature: parseFloat(temperature),
      Humidity: parseFloat(humidity),
    };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('Ai-Lifetime').textContent = result['Predicted Expected Lifetime'] + ' Years';
        document.getElementById('Ai-Health').textContent = result['IEC 62133-2:2017 Compliant'] ? 'Compliant' : 'Non-compliant';
        document.getElementById('Ai-Action').textContent = result['IEC 62133-2:2017 Compliant'] ? 'No action required' : 'Take action';
        document.getElementById('Ai-Standard').textContent = result['IEC 62133-2:2017 Compliant'] ? 'Met' : 'Not Met';
      } else {
        console.error('Error fetching AI predictions:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    fetchAiPrediction();
  });