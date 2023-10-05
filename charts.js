const ctx = document.getElementById("ctx");

const parsedData = JSON.parse(localStorage.getItem("products"));

if (parsedData) {
  renderCharts();
} else {
  document.write("Error: no data found");
}

function renderCharts() {
  const labels = [];
  const clicks = [];
  const views = [];

  for (let i = 0; i < parsedData.length; i++) {
    labels.push(parsedData[i].name);
    clicks.push(parsedData[i].clicks);
    views.push(parsedData[i].views);
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Clicks",
          data: clicks,
          backgroundColor: ["rgb(255, 205, 86)"],
        },
        {
          label: "Views",
          data: views,
          backgroundColor: ["rgba(255, 205, 86, 0.2)"],
          borderColor: ["rgba(255, 205, 86)"],
          borderWidth: 1,
        },
      ],
    },
  });
}
