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
    colors: ["#66bb6a", "#42a5f5", "#ffca28"],
  })
);
new Chart(
  currentOverviewCtx,
  circularChartOptions({
    values: [4.8, 5.0, 0.2],
    colors: ["#66bb6a", "#42a5f5", "#ffca28"],
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
        borderColor: "#66bb6a",
        backgroundColor: "rgba(102, 187, 106, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      x: { beginAtZero: true, grid: { color: "#424242" }, ticks: { color: "#ffffff" } },
      y: { beginAtZero: false, min: 10, max: 14, grid: { color: "#424242" }, ticks: { color: "#ffffff" } },
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
        borderColor: "#ef5350",
        backgroundColor: "rgba(239, 83, 80, 0.2)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      x: { beginAtZero: true, grid: { color: "#424242" }, ticks: { color: "#ffffff" } },
      y: { beginAtZero: false, min: 0, max: 6, grid: { color: "#424242" }, ticks: { color: "#ffffff" } },
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
  pointer: { length: 0.6, strokeWidth: 0.035, color: "#00acc1" },
  limitMax: false,
  colorStart: "#26c6da",
  strokeColor: "#424242",
  generateGradient: true,
};

const gauge = new Gauge(
  document.getElementById("temperature-gauge")
).setOptions(gaugeOptions);
gauge.maxValue = 100;
gauge.setMinValue(0);
gauge.set(50);
document.getElementById("temperature-value").textContent = "50°C";
