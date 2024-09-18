// Create gauges dynamically with updated values
const createGauge = (elementId, options, maxValue, initialValue) => {
  const gauge = new Gauge(document.getElementById(elementId)).setOptions(options);
  gauge.maxValue = maxValue;
  gauge.setMinValue(0);
  gauge.set(initialValue);
  return gauge;
};

const updateGauges = (temperature, humidity) => {
  // Temperature gauge
  tempGauge.set(temperature);
  document.getElementById("temperature-value").textContent = `${temperature}°C`;

  // Humidity gauge
  humidityGauge.set(humidity);
  document.getElementById("humidity-value").textContent = `${humidity}%`;
};

// Temperature gauge options
const tempGaugeOptions = {
  angle: 0.15,
  lineWidth: 0.2,
  radiusScale: 1,
  pointer: { length: 0.6, strokeWidth: 0.035, color: "#B0BEC5" },
  limitMax: false,
  strokeColor: "#616161",
  generateGradient: true,
  staticZones: [
    { strokeStyle: "#4caf50", min: 0, max: 30 },
    { strokeStyle: "#ffca28", min: 30, max: 70 },
    { strokeStyle: "#f44336", min: 70, max: 100 },
  ],
};

// Humidity gauge options
const humidityGaugeOptions = {
  angle: 0.15,
  lineWidth: 0.2,
  radiusScale: 1,
  pointer: { length: 0.6, strokeWidth: 0.035, color: "#B0BEC5" },
  limitMax: false,
  limitMin: false,
  strokeColor: "#616161",
  colorStart: "#6FADCF",
  colorStop: "#8FC0DA",
  strokeColor: "#E0E0E0",
  generateGradient: true,
  highDpiSupport: true,
};

// Initialize gauges
const tempGauge = createGauge("temperature-gauge", tempGaugeOptions, 100, 0);
const humidityGauge = createGauge("humidityMeter", humidityGaugeOptions, 100, 0);

// Refresh data every second
setInterval(fetchSensorData, 1000);
