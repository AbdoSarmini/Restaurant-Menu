var cart = [];

loadCartItemsFromStorage();

renderCartItems(true);

function onAddToCart(id, event) {
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
  } else {
    itemToAdd.totalPrice = getTotalPrice(itemToAdd);

    cart.push(itemToAdd);
  }
  localStorage.setItem("cartItems", JSON.stringify(cart));

  showNotification(itemToAdd.title);
  showAnimation(event);
}

function getCartCount() {
  loadCartItemsFromStorage();

  totalCount = 0;
  cart.forEach((item) => {
    totalCount += item.count;
  });

  return totalCount;
}

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

function renderCartItems(isanimate = false) {
  updateCartButtonCount();

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
  totalPrice = parseFloat(totalPrice).toFixed(2);
  document.getElementById(
    "totalPrice"
  ).innerText = `Total Price: $${totalPrice}`;
}

// <button onclick="deleteItemFromCart(${index})" class="linkButton" href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>

function updateCartButtonCount() {
  document.getElementById("cartCount").innerText = getCartCount();
}

updateCartButtonCount();

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

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight - 5 || document.documentElement.clientHeight - 5)
  );
}
