var cart = [];

loadCartItemsFromStorage();
renderCartItems();

function onAddToCart(id) {
  var itemToAdd = menuItems.find((item) => item.id == id);
  itemToAdd.count = 1;

  // Find item count
  var indexOfOldItem = cart.findIndex(
    (cartItem) => cartItem.id == itemToAdd.id
  );
  if (indexOfOldItem != -1) {
    console.log(indexOfOldItem);

    cart[indexOfOldItem].count = parseInt(cart[indexOfOldItem].count) + 1;
    console.log("un update" + cart[indexOfOldItem]);
  } else {
    cart.push(itemToAdd);
    console.log("un new" + itemToAdd);
  }
  localStorage.setItem("cartItems", JSON.stringify(cart));
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

// function onCountChange(index) {
//   var value = document.getElementById("countInput" + index).value;
//   cart[index].count = value;
//   localStorage.setItem("cartItems", JSON.stringify(cart));

//   renderCartItems();
// }

function decreaseCount(index) {
  var newCount = parseInt(cart[index].count) - 1;
  if (newCount > 0) cart[index].count = newCount;

  localStorage.setItem("cartItems", JSON.stringify(cart));

  renderCartItems();
}

function increaseCount(index) {
  cart[index].count = parseInt(cart[index].count) + 1;

  localStorage.setItem("cartItems", JSON.stringify(cart));

  renderCartItems();
}

function renderCartItems() {
  var cartItemsContainer =
    document.getElementsByClassName("cartItemsContainer")[0];
  if (cartItemsContainer == undefined) return;
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    item.totalPrice =
      parseFloat(item.price.substring(1, item.price.length - 1)) *
      parseInt(cart[index].count);

    item.totalPrice = item.totalPrice.toFixed(2);
    cartItemsContainer.insertAdjacentHTML(
      "beforeend",
      // <input oninput="onCountChange(${index})" name="count" id="countInput${index}" class="countInput" type="number" value="${item.count}">

      `
    <div class="menuItem">
          <img src="./images/placeholder.jpg" alt="" />
          <div class="menuContent">
            <div style="width:70%;">
            <h2>${item.title}</h2>
            <p class="menuDesc">
              ${item.description}
            </p>
            </div>
            <div class="menuItemFooter">
            <button class="counterButton" onclick="decreaseCount(${index})" >-</button>
              
              <div style="min-width:20px; text-align:center"><p> ${item.count} </p></div>
            <button class="counterButton" onclick="increaseCount(${index})" >+</button>

              <p>x ${item.price} </p>
              <div style="min-width:110px; text-align:right; "><h3 class="price">$${item.totalPrice}</h3></div>
              <button onclick="deleteItemFromCart(${index})" class="linkButton" href="#">Delete</button>
            </div>
          </div>
        </div>
    `
    );
  });
}
