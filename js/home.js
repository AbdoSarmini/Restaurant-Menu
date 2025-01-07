// Load Categories
var categoriesContainer =
  document.getElementsByClassName("categoriesFilter")[0];
categories.forEach((category) => {
  //   var button = document.createElement("button");
  categoriesContainer.insertAdjacentHTML(
    "beforeend",
    `<input onchange="onCategoryChange()" type="radio" value="${category.id}" name="category" id="${category.id}">
    <label class="categoryButton" for="${category.id}">${category.name}</label>    
    `
  );
});

var itemsToRender = menuItems;

function renderItems() {
  var itemsContainer = document.getElementsByClassName("itemsContainer")[0];
  itemsContainer.innerHTML = "";
  itemsToRender.forEach((item, index) => {
    //   var button = document.createElement("button");
    itemsContainer.insertAdjacentHTML(
      "beforeend",

      `
    <div class="menuItem">
          <img src=".${item.image}" alt="" />
          <div class="menuContent">
            <h2>${item.title}</h2>
            <p class="menuDesc">
              ${item.description}
            </p>
            <div class="menuItemFooter">
              <h3 class="price">${item.price}</h3>
              <button onclick="onAddToCart(${item.id}, event)" class="linkButton" href="#">
              <span class="buttonContent">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
              <span>Add To Cart</span>
              
              </span>
              </button>
            </div>
          </div>
        </div>
    `
    );
  });
  animate();
}

renderItems();

// On Filter Change

function onCategoryChange() {
  var value = document.querySelector('input[name="category"]:checked').value;
  if (value == "all") itemsToRender = menuItems;
  else {
    itemsToRender = menuItems.filter((item) => item.categoryId == value);
  }
  renderItems();
}

function onSearch() {
  var searchValue = document.querySelector('input[name="search"]').value;
  itemsToRender = menuItems.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  renderItems();

  document.getElementById("all").checked = true;
}

function updateCartButtonCount() {
  document.getElementById("cartCount").innerText = getCartCount();
}

updateCartButtonCount();

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}

animate();
document.addEventListener("scroll", animate);

function animate() {
  const items = document.querySelectorAll(".menuItem");

  items.forEach((item) => {
    const boool = item.classList.contains("menuItemVisible");
    if (!boool && isInView(item)) {
      item.classList.add("menuItemVisible");
    }
  });
}
