const voltageOverviewCtx = document
  .getElementById("voltage-overview")
  .getContext("2d");
const currentOverviewCtx = document
  .getElementById("current-overview")
  .getContext("2d");
const voltageHistoryCtx = document
  .getElementById("voltage-history")
  .getContext("2d");
const currentHistoryCtx = document
  .getElementById("current-history")
  .getContext("2d");

const circularChartOptions = (data) => ({
  type: "doughnut",
  data: {
    datasets: [{ data: data.values, backgroundColor: data.colors }],
  },
  options: { cutout: "70%" },
});

new Chart(
  voltageOverviewCtx,
  circularChartOptions({
    values: [12.8, 13.0, 0.2],
    colors: ["#66bb6a", "#42a5f5", "#ef5350"], // Green, Blue, Red
  })
);
new Chart(
  currentOverviewCtx,
  circularChartOptions({
    values: [4.8, 5.0, 0.2],
    colors: ["#66bb6a", "#42a5f5", "#ef5350"], // Green, Blue, Red
  })
);

new Chart(voltageHistoryCtx, {
  type: "line",
  data: {
    labels: ["0h", "1h", "2h", "3h", "4h"],
    datasets: [
      {
        label: "Voltage (V)",
        data: [13.0, 12.9, 12.7, 12.6, 12.5],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#616161" },
        ticks: { color: "#ffffff" },
      },
      y: {
        beginAtZero: false,
        min: 10,
        max: 14,
        grid: { color: "#616161" },
        ticks: { color: "#ffffff" },
      },
    },
    plugins: {
      legend: { labels: { color: "#ffffff" } },
    },
  },
});

new Chart(currentHistoryCtx, {
  type: "line",
  data: {
    labels: ["0h", "1h", "2h", "3h", "4h"],
    datasets: [
      {
        label: "Current (A)",
        data: [4.8, 4.7, 4.6, 4.5, 4.4],
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#616161" },
        ticks: { color: "#ffffff" },
      },
      y: {
        beginAtZero: false,
        min: 0,
        max: 6,
        grid: { color: "#616161" },
        ticks: { color: "#ffffff" },
      },
    },
    plugins: {
      legend: { labels: { color: "#ffffff" } },
    },
  },
});

const gaugeOptions = {
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

const gauge = new Gauge(
  document.getElementById("temperature-gauge")
).setOptions(gaugeOptions);
gauge.maxValue = 100;
gauge.setMinValue(0);
gauge.set(50);
document.getElementById("temperature-value").textContent = "50°C";
