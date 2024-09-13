// Contexts for charts
const contexts = {
  voltageOverview: document.getElementById("voltage-overview").getContext("2d"),
  currentOverview: document.getElementById("current-overview").getContext("2d"),
  voltageHistory: document.getElementById("voltage-history").getContext("2d"),
  currentHistory: document.getElementById("current-history").getContext("2d"),
};

// Chart options
const circularChartOptions = (data) => ({
  type: "doughnut",
  data: {
    datasets: [{ data: data.values, backgroundColor: data.colors }],
  },
  options: { cutout: "70%" },
});

const lineChartOptions = (label, data, borderColor, backgroundColor, yMin, yMax) => ({
  type: "line",
  data: {
    labels: ["0h", "1h", "2h", "3h", "4h"],
    datasets: [
      {
        label: label,
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
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
        min: yMin,
        max: yMax,
        grid: { color: "#616161" },
        ticks: { color: "#ffffff" },
      },
    },
    plugins: {
      legend: { labels: { color: "#ffffff" } },
    },
  },
});

// Create charts
new Chart(contexts.voltageOverview, circularChartOptions({
  values: [12.8, 13.0, 0.2],
  colors: ["#66bb6a", "#42a5f5", "#ef5350"], // Green, Blue, Red
}));

new Chart(contexts.currentOverview, circularChartOptions({
  values: [4.8, 5.0, 0.2],
  colors: ["#66bb6a", "#42a5f5", "#ef5350"], // Green, Blue, Red
}));

new Chart(contexts.voltageHistory, lineChartOptions(
  "Voltage (V)",
  [13.0, 12.9, 12.7, 12.6, 12.5],
  "#4caf50",
  "rgba(76, 175, 80, 0.2)",
  10,
  14
));

new Chart(contexts.currentHistory, lineChartOptions(
  "Current (A)",
  [4.8, 4.7, 4.6, 4.5, 4.4],
  "#f44336",
  "rgba(244, 67, 54, 0.2)",
  0,
  6
));
