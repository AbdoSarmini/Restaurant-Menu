// Load Categories
var categoriesContainer = document.getElementsByClassName("categorisFilter")[0];
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
  itemsToRender.forEach((item) => {
    //   var button = document.createElement("button");
    itemsContainer.insertAdjacentHTML(
      "beforeend",

      `
    <div class="menuItem">
          <img src="./images/placeholder.jpg" alt="" />
          <div class="menuContent">
            <h2>${item.title}</h2>
            <p class="menuDesc">
              ${item.description}
            </p>
            <div class="menuItemFooter">
              <h3 class="price">${item.price}</h3>
              <a class="linkButton" href="#">Add To Cart</a>
            </div>
          </div>
        </div>
    `
    );
  });
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
