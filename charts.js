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
          backgroundColor: ["black"],
          borderColor: ["black"],
          borderWidth: 1,
        },
        {
          label: "Views",
          data: views,
          backgroundColor: ["transparent"],
          borderColor: ["black"],
          borderWidth: 1,
        },
      ],
    },
  });

  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Clicks",
          data: clicks,
        },
      ],
    },
  });
}
