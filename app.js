const votingOptionsEl = document.getElementById("options");
const option1El = document.getElementById("option1");
const option2El = document.getElementById("option2");
const option3El = document.getElementById("option3");

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
  const option1Index = createRandomIndex(products);
  const option2Index = createRandomIndex(products);
  const option3Index = createRandomIndex(products);

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

function handleClick() {
  renderProducts();
}

votingOptionsEl.addEventListener("click", handleClick);
