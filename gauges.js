const createGauge = (elementId, options, maxValue, initialValue) => {
    const gauge = new Gauge(document.getElementById(elementId)).setOptions(options);
    gauge.maxValue = maxValue;
    gauge.setMinValue(0);
    gauge.set(initialValue);
    return gauge;
  };
  
  // Temperature gauge
  const tempGaugeOptions = {
    angle: 0.15,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: { length: 0.6, strokeWidth: 0.035, color: "#B0BEC5" }, // Grey pointer color
    limitMax: false,
    strokeColor: "#616161",
    generateGradient: true,
    staticZones: [
      { strokeStyle: "#4caf50", min: 0, max: 30 }, // Darker Green
      { strokeStyle: "#ffca28", min: 30, max: 70 }, // Yellow
      { strokeStyle: "#f44336", min: 70, max: 100 }, // Darker Red
    ],
  };
  
  createGauge("temperature-gauge", tempGaugeOptions, 100, 30);
  document.getElementById("temperature-value").textContent = "30°C";
  
  // Humidity gauge
  const humidityGaugeOptions = {
    angle: 0.15,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: { length: 0.6, strokeWidth: 0.035, color: "#B0BEC5" }, // Grey pointer color
    limitMax: false,
    limitMin: false,
    strokeColor: "#616161",
    colorStart: "#6FADCF",
    colorStop: "#8FC0DA",
    strokeColor: "#E0E0E0",
    generateGradient: true,
    highDpiSupport: true,
  };
  
  createGauge("humidityMeter", humidityGaugeOptions, 100, 60);
  document.getElementById("humidity-value").textContent = "60%";
  