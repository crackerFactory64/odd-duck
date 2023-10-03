const votingOptionsEl = document.getElementById("options");
const option1El = document.getElementById("option1");
const option2El = document.getElementById("option2");
const option3El = document.getElementById("option3");

const resultsHeading = document.getElementById("results-heading");
const viewResultsBtn = document.getElementById("view-results");
const resultsEl = document.getElementById("results");
const ctx = document.getElementById("chart");

function Product(name) {
  this.name = name;
  this.src = `./assets/images/${name}.jpg`;
  this.clicks = 0;
  this.views = 0;
}

const products = [
  new Product("bag"),
  new Product("banana"),
  new Product("bathroom"),
  new Product("boots"),
  new Product("breakfast"),
  new Product("bubblegum"),
  new Product("chair"),
  new Product("cthulhu"),
  new Product("dog-duck"),
  new Product("dragon"),
  new Product("pen"),
  new Product("pet-sweep"),
  new Product("scissors"),
  new Product("shark"),
  new Product("sweep"),
  new Product("tauntaun"),
  new Product("unicorn"),
  new Product("water-can"),
  new Product("wine-glass"),
];

Product.prototype.increaseViewCount = function () {
  this.views++;
};

Product.prototype.increaseClickCount = function () {
  this.clicks++;
};

function createRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function renderProducts() {
  console.table(previousProductIndexes);

  let option1Index = createRandomIndex(products);
  let option2Index = createRandomIndex(products);
  let option3Index = createRandomIndex(products);

  while (
    option1Index === option2Index ||
    option1Index === option3Index ||
    previousProductIndexes.indexOf(option1Index) !== -1 ||
    option2Index === option3Index ||
    previousProductIndexes.indexOf(option2Index) !== -1 ||
    previousProductIndexes.indexOf(option3Index) !== -1
  ) {
    option1Index = createRandomIndex(products);
    option2Index = createRandomIndex(products);
    option3Index = createRandomIndex(products);
  }

  option1El.src = products[option1Index].src;
  option2El.src = products[option2Index].src;
  option3El.src = products[option3Index].src;

  option1El.alt = products[option1Index].name;
  option2El.alt = products[option2Index].name;
  option3El.alt = products[option3Index].name;

  products[option1Index].increaseViewCount();
  products[option2Index].increaseViewCount();
  products[option3Index].increaseViewCount();

  previousProductIndexes = [option1Index, option2Index, option3Index];
}

function handleClick(event) {
  const clickedElement = event.target;
  if (clickedElement !== votingOptionsEl) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].name === clickedElement.alt) {
        products[i].clicks++;
        break;
      }
    }
  }
  renderProducts();
  rounds--;

  resultsHeading.textContent = `Rounds remaining: ${rounds}`;

  if (rounds === 0) {
    endVoting();
  }
}

function endVoting() {
  votingOptionsEl.removeEventListener("click", handleClick);
  viewResultsBtn.removeAttribute("disabled");
}

function renderResults() {
  resultsHeading.textContent = "Results";
  for (let i = 0; i < products.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${products[i].name} had ${products[i].views} views and ${products[i].clicks} clicks.`;
    resultsEl.appendChild(li);
  }
  viewResultsBtn.setAttribute("disabled", "");

  const chartLabels = [];
  const clicks = [];
  const views = [];

  for (let i = 0; i < products.length; i++) {
    chartLabels.push(products[i].name);
    clicks.push(products[i].clicks);
    views.push(products[i].views);
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLabels,
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

  ctx.classList.add("show");
}

let rounds = 25;
let previousProductIndexes = [];

resultsHeading.textContent = `Rounds remaining: ${rounds}`;
votingOptionsEl.addEventListener("click", handleClick);
viewResultsBtn.addEventListener("click", renderResults);

renderProducts();
