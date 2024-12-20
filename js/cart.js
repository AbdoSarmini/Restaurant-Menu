var cart = [];

loadCartItemsFromStorage();
renderCartItems();

function onAddToCart(id) {
  cart.push(menuItems.find((item) => item.id == id));
  localStorage.setItem("cartItems", JSON.stringify(cart));

  console.log(cart);
}

function loadCartItemsFromStorage() {
  const data = localStorage.getItem("cartItems");
  cart = data ? JSON.parse(data) : [];
}

function deleteItemFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCartItems();
}

function renderCartItems() {
  var cartItemsContainer =
    document.getElementsByClassName("cartItemsContainer")[0];
  if (cartItemsContainer == undefined) return;
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    cartItemsContainer.insertAdjacentHTML(
      "beforeend",

      `
    <div class="menuItem">
          <img src="./images/placeholder.jpg" alt="" />
          <div class="menuContent">
            <div>
            <h2>${item.title}</h2>
            <p class="menuDesc">
              ${item.description}
            </p>
            </div>
            <div class="menuItemFooter">
              <h3 class="price">${item.price}</h3>
              <button onclick="deleteItemFromCart(${index})" class="linkButton" href="#">Delete</button>
            </div>
          </div>
        </div>
    `
    );
  });
}
