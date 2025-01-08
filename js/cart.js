var cart = [];
loadCartItemsFromStorage();

// Initial render of items on page load.
renderCartItems(true);

// When an item is added to the cart, it checks if its already
// exist in the cart. If yes, it increases the count of it.
// if not, it adds the new item to the cart with count of 1.
function onAddToCart(id, event) {
  // Gets the item from the items list (data.js)
  var itemToAdd = menuItems.find((item) => item.id == id);
  itemToAdd.count = 1;

  // Check if it already exist
  var indexOfOldItem = cart.findIndex(
    (cartItem) => cartItem.id == itemToAdd.id
  );
  if (indexOfOldItem != -1) {
    var item = cart[indexOfOldItem];
    // If the item is found, increase the count and update the total price.
    item.count = parseInt(item.count) + 1;
    item.totalPrice = getTotalPrice(item);
  } else {
    // Add the new item to the cart if it wasn't already exist.
    itemToAdd.totalPrice = getTotalPrice(itemToAdd);
    cart.push(itemToAdd);
  }

  // Store the current to the local storage.
  localStorage.setItem("cartItems", JSON.stringify(cart));

  showNotification(itemToAdd.title);

  showAnimation(event);
}

// Gets the total count of the cart items.
function getCartCount() {
  loadCartItemsFromStorage();
  totalCount = 0;
  cart.forEach((item) => {
    totalCount += item.count;
  });

  return totalCount;
}

// Animation of the flying circle
function showAnimation(event) {
  const cart = document.querySelector(".cartCount");
  const circle = document.createElement("div");
  circle.classList.add("fly-circle");
  document.body.appendChild(circle);

  // Get positions relative to the document
  const rectButton = event.target.getBoundingClientRect();
  const rectCart = cart.getBoundingClientRect();

  // Calculate positions with scroll offset
  const buttonX = rectButton.left + rectButton.width / 2 + window.scrollX;
  const buttonY = rectButton.top + rectButton.height / 2 + window.scrollY;
  const cartX = rectCart.left + rectCart.width / 2 + window.scrollX;
  const cartY = rectCart.top + rectCart.height / 2 + window.scrollY;

  // Set initial position of the circle
  circle.style.left = `${buttonX}px`;
  circle.style.top = `${buttonY}px`;

  // Calculate target offsets
  const targetX = cartX - buttonX;
  const targetY = cartY - buttonY;

  // Set CSS variables for animation
  circle.style.setProperty("--target-x", `${targetX}px`);
  circle.style.setProperty("--target-y", `${targetY}px`);

  circle.addEventListener("animationend", () => {
    circle.remove();
    updateCartButtonCount();
  });
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

// Gets the saved cart items from local storage.
function loadCartItemsFromStorage() {
  const data = localStorage.getItem("cartItems");
  cart = data ? JSON.parse(data) : [];
}

function deleteItemFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCartItems();
}

// Calculates the total price of an cart item by
// multiplying the count and the price.
function getTotalPrice(item) {
  totalPrice =
    parseFloat(item.price.substring(1, item.price.length)) *
    parseInt(item.count);

  totalPrice = totalPrice.toFixed(2);
  return totalPrice;
}

function decreaseCount(index) {
  var item = cart[index];

  var newCount = parseInt(item.count) - 1;
  if (newCount <= 0) {
    deleteItemFromCart(index);
    return;
  }
  item.count = newCount;

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

// Rerenders the whole list of cart items when an update happens.
// For each item, insert a cart item in the items container.
// Lastly start the animations on every rerender.
function renderCartItems(isanimate = false) {
  updateCartButtonCount();

  var totalPrice = 0;
  var cartItemsContainer =
    document.getElementsByClassName("cartItemsContainer")[0];
  if (cartItemsContainer == undefined) return;
  cartItemsContainer.innerHTML = "";

  if (cart.length == 0) {
    cartItemsContainer.innerHTML =
      "<h3 style='font-weight:normal;'><center>Cart is empty.</center></h3>";
  }
  cart.forEach((item, index) => {
    totalPrice += parseFloat(item.totalPrice);

    cartItemsContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="menuItemContainer" style="display: flex; ">
    <div class="menuItem  ${!isanimate ? "menuItemVisible" : ""}">
    
    
          <img src=".${item.image}" alt="" />
          <div class="menuContent">
            <div style="width:70%;">
            <h2>${item.title}</h2>
            <p class="menuDesc">
              ${item.description}
            </p>
            </div>
            <div class="menuItemFooter">
            <div class="counterContainer">
            
            <div>
             <button class="counterButton" onclick="decreaseCount(${index})" >-</button>
              
              <div style="min-width:20px; text-align:center"><p> ${
                item.count
              } </p></div>
            <button class="counterButton" onclick="increaseCount(${index})" >+</button>

            </div>
              <p>x ${item.price} </p>
            
            </div>
              <div class="priceContainer"><h3 class="price">$${
                item.totalPrice
              }</h3></div>
            </div>
          </div>
    </div>

        </div>
    `
    );
    if (isanimate) {
      animate();
    }
  });

  // Update the total cart price
  totalPrice = parseFloat(totalPrice).toFixed(2);
  document.getElementById(
    "totalPrice"
  ).innerText = `Total Price: $${totalPrice}`;
}

function updateCartButtonCount() {
  document.getElementById("cartCount").innerText = getCartCount();
}

// Update the count number on page load.
updateCartButtonCount();

function emptyCart() {
  cart = [];
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCartItems();
}

// ANIMATIONS

// To start animations on scroll.
document.addEventListener("scroll", animate);

// Addes the class that is responsible of the fade-in animation.
function animate() {
  const items = document.querySelectorAll(".menuItem");

  items.forEach((item) => {
    const boool = item.classList.contains("menuItemVisible");
    if (!boool && isInView(item)) {
      item.classList.add("menuItemVisible");
    }
  });
}
// Checks if the element is visible on screen to start the animation.

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight - 5 || document.documentElement.clientHeight - 5)
  );
}
