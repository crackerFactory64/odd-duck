const votingOptionsEl = document.getElementById("options");
const option1El = document.getElementById("option1");
const option2El = document.getElementById("option2");
const option3El = document.getElementById("option3");

const resultsHeading = document.getElementById("results-heading");
const viewResultsBtn = document.getElementById("view-results");
const resultsEl = document.getElementById("results");

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
}

const products = [
  new Product("R2D2 Bag", "./assets/images/bag.jpg"),
  new Product("Banana Slicer", "./assets/images/banana.jpg"),
  new Product("Tablet Holder", "./assets/images/bathroom.jpg"),
  new Product("Toeless Wellies", "./assets/images/boots.jpg"),
  new Product("Breakfast Oven", "./assets/images/breakfast.jpg"),
  new Product("Meatball Bubblegum", "./assets/images/bubblegum.jpg"),
  new Product("Lumpy Chair", "./assets/images/chair.jpg"),
  new Product("Cthulhu Doll", "./assets/images/cthulhu.jpg"),
  new Product("Dog Quacker", "./assets/images/dog-duck.jpg"),
  new Product("Dragon Meat", "./assets/images/dragon.jpg"),
  new Product("Pen Cutlery", "./assets/images/pen.jpg"),
  new Product("Pet Sweepers", "./assets/images/pet-sweep.jpg"),
  new Product("Pizza Scissors", "./assets/images/scissors.jpg"),
  new Product("Shark Sleeping Bag", "./assets/images/shark.jpg"),
  new Product("Baby Sweeper", "./assets/images/sweep.png"),
  new Product("Tauntaun Sleeping Bag", "./assets/images/tauntaun.jpg"),
  new Product("Unicorn Meat", "./assets/images/unicorn.jpg"),
  new Product("Infinite Watering Can", "./assets/images/water-can.jpg"),
  new Product("Egg Wine Glass", "./assets/images/wine-glass.jpg"),
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
  let option1Index = createRandomIndex(products);
  let option2Index = createRandomIndex(products);
  let option3Index = createRandomIndex(products);

  while (option1Index === option2Index || option1Index === option3Index) {
    option1Index = createRandomIndex(products);
  }

  while (option2Index === option3Index) {
    option2Index = createRandomIndex(products);
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
}

renderProducts();

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
}

let rounds = 25;
resultsHeading.textContent = `Rounds remaining: ${rounds}`;
votingOptionsEl.addEventListener("click", handleClick);
viewResultsBtn.addEventListener("click", renderResults);
