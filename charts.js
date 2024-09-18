// Contexts for charts
const contexts = {
  voltageOverview: document.getElementById("voltage-overview").getContext("2d"),
  currentOverview: document.getElementById("current-overview").getContext("2d"),
  voltageHistory: document.getElementById("voltage-history").getContext("2d"),
  currentHistory: document.getElementById("current-history").getContext("2d"),
};

// Global arrays to store history
let voltageHistoryData = [];
let currentHistoryData = [];
const maxHistoryLength = 10; // Maximum length of history

// Function to fetch sensor data from the endpoint
async function fetchSensorData() {
  try {
    const response = await fetch("http://192.168.1.4/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    return null;
  }
}

// Function to calculate and display the difference between theoretical and practical values
function calculateDifferences(voltage, current) {
  const theoreticalVoltage = parseFloat(document.getElementById("theoretical-voltage").value);
  const theoreticalCurrent = parseFloat(document.getElementById("theoretical-current").value);

  document.getElementById("practical-voltage").textContent = `${voltage}V`;
  document.getElementById("practical-current").textContent = `${current}A`;

  const voltageDifference = Math.abs(theoreticalVoltage - voltage).toFixed(2);
  const currentDifference = Math.abs(theoreticalCurrent - current).toFixed(2);

  document.getElementById("voltage-difference").textContent = `${voltageDifference}V`;
  document.getElementById("current-difference").textContent = `${currentDifference}A`;
}

// Function to update the charts
function updateCharts(voltage, current) {
  const theoreticalVoltage = parseFloat(document.getElementById("theoretical-voltage").value);
  const theoreticalCurrent = parseFloat(document.getElementById("theoretical-current").value);

  voltageOverviewChart.data.datasets[0].data = [voltage, theoreticalVoltage, theoreticalVoltage - voltage];
  voltageOverviewChart.update();

  currentOverviewChart.data.datasets[0].data = [current, theoreticalCurrent, theoreticalCurrent - current];
  currentOverviewChart.update();

  updateHistoryChart(voltageHistoryChart, voltageHistoryData, voltage);
  updateHistoryChart(currentHistoryChart, currentHistoryData, current);

  calculateDifferences(voltage, current);
}

// Function to update history charts
function updateHistoryChart(chart, data, value) {
  data.push(value);
  if (data.length > maxHistoryLength) data.shift();

  chart.data.labels.push("");
  if (chart.data.labels.length > maxHistoryLength) chart.data.labels.shift();

  chart.data.datasets[0].data = data;
  chart.update();
}

// Function to refresh the data every second
async function refreshData() {
  const sensorData = await fetchSensorData();
  if (sensorData) {
    updateCharts(sensorData.voltage, sensorData.current);
  }
}

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
    labels: [],
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
const voltageOverviewChart = new Chart(
  contexts.voltageOverview,
  circularChartOptions({
    values: [1, 1, 1],
    colors: ["#66bb6a", "#42a5f5", "#ef5350"], // Green, Blue, Red
  })
);

const currentOverviewChart = new Chart(
  contexts.currentOverview,
  circularChartOptions({
    values: [1, 1, 1],
    colors: ["#66bb6a", "#42a5f5", "#ef5350"], // Green, Blue, Red
  })
);

const voltageHistoryChart = new Chart(
  contexts.voltageHistory,
  lineChartOptions(
    "Voltage (V)",
    voltageHistoryData,
    "#4caf50",
    "rgba(76, 175, 80, 0.2)",
    0,
    14
  )
);

const currentHistoryChart = new Chart(
  contexts.currentHistory,
  lineChartOptions(
    "Current (A)",
    currentHistoryData,
    "#f44336",
    "rgba(244, 67, 54, 0.2)",
    0,
    6
  )
);

// Set an interval to refresh the data every second
setInterval(refreshData, 1000);
