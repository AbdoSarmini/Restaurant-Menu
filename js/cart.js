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
    var item = cart[indexOfOldItem];

    item.count = parseInt(item.count) + 1;
    item.totalPrice = getTotalPrice(item);
    console.log("un update" + item);
  } else {
    itemToAdd.totalPrice = getTotalPrice(itemToAdd);
    cart.push(itemToAdd);
    console.log(itemToAdd);

    console.log("un new" + itemToAdd);
  }
  localStorage.setItem("cartItems", JSON.stringify(cart));

  showNotification(itemToAdd.title);
}

function showNotification(itemTitle) {
  const container = document.getElementById("notificationContainer");

  removeOldNotification();

  // Create a new notification
  const newNotification = document.createElement("div");
  newNotification.classList.add("notification");
  newNotification.textContent = `"${itemTitle}" has ben added to the cart`;

  // Append it to the container
  container.appendChild(newNotification);

  // Trigger the show animation
  setTimeout(() => newNotification.classList.add("visible"), 10);
  setTimeout(removeNewNotification, 3000);

  function removeOldNotification() {
    const oldNotification = document.querySelector(".notification");
    if (oldNotification) {
      console.log("remove");

      oldNotification.classList.remove("visible");
      // Wait for the animation to complete before removing the element
      oldNotification.addEventListener(
        "transitionend",
        () => oldNotification.remove(),
        { once: true }
      );
    }
  }

  function removeNewNotification() {
    newNotification.classList.remove("visible");
    // Wait for the animation to complete before removing the element
    newNotification.addEventListener(
      "transitionend",
      () => newNotification.remove(),
      { once: true }
    );
  }
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

function getTotalPrice(item) {
  // var item = cart[index];
  totalPrice =
    parseFloat(item.price.substring(1, item.price.length - 1)) *
    parseInt(item.count);
  totalPrice = totalPrice.toFixed(2);
  return totalPrice;
}

function decreaseCount(index) {
  var item = cart[index];

  var newCount = parseInt(item.count) - 1;
  if (newCount > 0) item.count = newCount;

  item.totalPrice = getTotalPrice(item);

  localStorage.setItem("cartItems", JSON.stringify(cart));

  renderCartItems();
}

function increaseCount(index) {
  var item = cart[index];

  // Update the total price
  item.count = parseInt(item.count) + 1;
  item.totalPrice = getTotalPrice(item);

  localStorage.setItem("cartItems", JSON.stringify(cart));

  renderCartItems();
}

function renderCartItems() {
  var totalPrice = 0;
  var cartItemsContainer =
    document.getElementsByClassName("cartItemsContainer")[0];
  if (cartItemsContainer == undefined) return;
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    totalPrice += parseFloat(item.totalPrice);

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
  totalPrice = parseFloat(totalPrice).toFixed(2);
  document.getElementById(
    "totalPrice"
  ).innerText = `Total Price: $${totalPrice}`;
}
