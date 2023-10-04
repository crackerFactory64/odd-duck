const votingOptionsEl = document.getElementById("options");
const option1El = document.getElementById("option1");
const option2El = document.getElementById("option2");
const option3El = document.getElementById("option3");

const resultsHeading = document.getElementById("results-heading");
const viewResultsBtn = document.getElementById("view-results");
const resultsEl = document.getElementById("results");
const ctx = document.getElementById("chart");

function Product(name, clicks = 0, views = 0) {
  this.name = name;
  this.src = `./assets/images/${name}.jpg`;
  this.clicks = clicks;
  this.views = views;
}

const products = [];
checkLocal();

function checkLocal() {
  const parsedData = JSON.parse(localStorage.getItem("products"));
  if (!parsedData) {
    products.push(new Product("bag"));
    products.push(new Product("banana"));
    products.push(new Product("boots"));
    products.push(new Product("bathroom"));
    products.push(new Product("breakfast"));
    products.push(new Product("bubblegum"));
    products.push(new Product("chair"));
    products.push(new Product("cthulhu"));
    products.push(new Product("dog-duck"));
    products.push(new Product("dragon"));
    products.push(new Product("pen"));
    products.push(new Product("pet-sweep"));
    products.push(new Product("scissors"));
    products.push(new Product("shark"));
    products.push(new Product("sweep"));
    products.push(new Product("tauntaun"));
    products.push(new Product("unicorn"));
    products.push(new Product("water-can"));
    products.push(new Product("wine-glass"));

    storeInLocalStorage();
  } else {
    for (let i = 0; i < parsedData.length; i++) {
      products.push(
        new Product(
          parsedData[i].name,
          parsedData[i].clicks,
          parsedData[i].views
        )
      );
    }
  }
}

function storeInLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

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
  let option1Index = createRandomIndex(products);
  let option2Index = createRandomIndex(products);
  let option3Index = createRandomIndex(products);

  // while any of the generated indexes are the same as one used in the last round or the same as another generated index...
  while (
    option1Index === option2Index ||
    option1Index === option3Index ||
    previousProductIndexes.indexOf(option1Index) !== -1 ||
    option2Index === option3Index ||
    previousProductIndexes.indexOf(option2Index) !== -1 ||
    previousProductIndexes.indexOf(option3Index) !== -1
  ) {
    //...regenerate the indexes
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
        products[i].increaseClickCount();
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
  storeInLocalStorage();
}

function renderResults() {
  resultsHeading.textContent = "Results";

  for (let i = 0; i < products.length; i++) {
    const li = document.createElement("li");
    li.textContent = `'${products[i].name}' has had ${products[i].views} views and ${products[i].clicks} clicks.`;
    resultsEl.appendChild(li);
  }

  viewResultsBtn.setAttribute("disabled", "");

  const labels = [];
  const clicks = [];
  const views = [];

  for (let i = 0; i < products.length; i++) {
    labels.push(products[i].name);
    clicks.push(products[i].clicks);
    views.push(products[i].views);
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

  ctx.classList.add("show");
  votingOptionsEl.style.display = "none";
}

let rounds = 25;
let previousProductIndexes = [];
resultsHeading.textContent = `Rounds remaining: ${rounds}`;

votingOptionsEl.addEventListener("click", handleClick);
viewResultsBtn.addEventListener("click", renderResults);

renderProducts();
