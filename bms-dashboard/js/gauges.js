// Gauge configuration options
const gaugeOptions = {
  angle: 0.15,
  lineWidth: 0.2,
  radiusScale: 1,
  pointer: { length: 0.6, strokeWidth: 0.035, color: "#B0BEC5" },
  limitMax: false,
  strokeColor: "#616161",
  generateGradient: true,
  highDpiSupport: true,
};

// Specific gauge options
const tempGaugeOptions = {
  ...gaugeOptions,
  staticZones: [
    { strokeStyle: "#4caf50", min: 0, max: 30 },
    { strokeStyle: "#ffca28", min: 30, max: 70 },
    { strokeStyle: "#f44336", min: 70, max: 100 },
  ],
};

const humidityGaugeOptions = {
  ...gaugeOptions,
  colorStart: "#6FADCF",
  colorStop: "#8FC0DA",
  strokeColor: "#E0E0E0",
};

// Create gauges dynamically with updated values
const createGauge = (elementId, options, maxValue, initialValue) => {
  const gauge = new Gauge(document.getElementById(elementId)).setOptions(options);
  gauge.maxValue = maxValue;
  gauge.setMinValue(0);
  gauge.set(initialValue);
  return gauge;
};

// Update gauges with new values
const updateGauges = (temperature, humidity) => {
  tempGauge.set(temperature);
  document.getElementById("temperature-value").textContent = `${temperature}°C`;

  humidityGauge.set(humidity);
  document.getElementById("humidity-value").textContent = `${humidity}%`;
};

// Initialize gauges
const tempGauge = createGauge("temperature-gauge", tempGaugeOptions, 100, 0);
const humidityGauge = createGauge("humidityMeter", humidityGaugeOptions, 100, 0);
