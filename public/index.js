let totalPrice = 0;
let deliveryCharges = 100;

const orderData = {
  vanilla: {
    name: "vanilla",
    price: "300",
  },
  pineapple: {
    name: "pineapple",
    price: "400",
  },
  black: {
    name: "black",
    price: "400",
  },
  baloon: {
    name: "baloon",
    price: "70",
  },
  cap: {
    name: "cap",
    price: "40",
  },
};

const cartButton = document.querySelectorAll(".cart-btn");
const cartItems = document.querySelector("#cart-items");

function addToCart(event) {
  const orderInf = {
    name: event.target.value,
    price: getOrderDetails(event.target.value),
  };
  if (event.target.dataset.type === "add") {
    event.target.innerHTML = "Remove &#x2796;";
    console.log(event.target);
    event.target.dataset.type = "remove";
    setCartItems(orderInf);
    renderBasedOnOrder();
  } else {
    removeFromCart(orderInf.name);
    event.target.dataset.type = "add";
    event.target.innerHTML = "Add &#x1F6D2;";
  }
}

const getCartItems = () => {
  console.log("getting data from cart");
  const ordersFromStorage = JSON.parse(localStorage.getItem("orders"));
  return ordersFromStorage;
};

const alreadyInCart = getCartItems();

function checkItemInCart(value, cartItems) {
  let check = cartItems.some((item) => item.name === value);
  return check;
}

cartButton.forEach((item) => {
  setTypeOfButtonByDefault(item, alreadyInCart);
});

function setTypeOfButtonByDefault(btn, cartValues) {
  if (checkItemInCart(btn.value, cartValues)) {
    btn.dataset.type = "remove";
    btn.innerHTML = "Remove &#x2796;";
  }
}
/* assign the listener to btns */
cartButton.forEach((item) => {
  item.addEventListener("click", addToCart);
});

/* get order details from json data */
function getOrderDetails(orderName) {
  return orderData[`${orderName}`].price;
}

function renderOrderUrl(orderValues) {
  return `./order.html?cake=${orderValues}`;
}

function setCartItems(order) {
  const newOrder = order;
  const existItems = getCartItems();
  if (existItems) {
    localStorage.setItem("orders", JSON.stringify([...existItems, newOrder]));
    renderCartStats();
  } else {
    localStorage.setItem("orders", JSON.stringify([newOrder]));
    renderCartStats();
  }
}

/* for removing cart from items */
function removeFromCart(name) {
  const existOrder = getCartItems();
  const filterOrders = existOrder.filter((item) => item.name !== name);
  localStorage.setItem("orders", JSON.stringify(filterOrders));
  if (cartItems) {
    renderCartStats();
  }
}

/* render cart status when cart action happens */
function renderCartStats() {
  console.log("stats");
  const items = getCartItems();
  if (cartItems) {
    cartItems.innerHTML = items.length;
  }
}
if (window.location.pathname !== "/order.html") {
  renderCartStats();
}

/* setCartItems(orderInformation); */

if (window.location.pathname === "/order.html") {
  const orderField = document.getElementById("order-name");
  const orderContainer = document.getElementById("order-container");
  const confirmContainer = document.getElementById("confirm-container");
  const orderDetails = document.getElementById("order-details");
  const userEmail = document.getElementById("user-email");
  const itemsContainer = document.getElementById("items");
  const priceContainer = document.getElementById("price");
  const crossContainer = document.getElementById("cross");
  let crossButton;

  confirmContainer.style.display = "none";
  /*  orderField.innerHTML = `&#x2705; ${orderParams.cake || orderParams.snack}`;
   */
  let name, phoneNumber, address, email, ConfirmOrderString;

  function submitOrderForm(event) {
    event.preventDefault();
    name = event.target.elements.name.value;
    phoneNumber = event.target.elements.Number.value;
    address = event.target.elements.Address.value;
    email = event.target.elements.email.value;
    orderContainer.style.display = "none";
    confirmContainer.style.display = "flex";
    ConfirmOrderString = `Ordered: ${
      orderParams.cake || orderParams.snack
    } \n #####DETAILS###### \n Name : ${name} \n Call : ${phoneNumber} \n Address: ${address}`;
    orderDetails.value = ConfirmOrderString;
    userEmail.value = email;
  }
  function onEdit(event) {
    event.preventDefault();
    orderContainer.style.display = "flex";
    confirmContainer.style.display = "none";
  }

  /* Billing */

  function renderBasedOnOrder() {
    itemsContainer.innerHTML = "";
    priceContainer.innerHTML = "";
    crossContainer.innerHTML = "";
    const orderParams = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (orderParams.cake) {
      const singleItem = {
        name: orderParams.cake,
        price: getOrderDetails(orderParams.cake),
      };
      renderCartOrdersBill([singleItem]);
    } else {
      const values = getCartItems();
      renderCartOrdersBill(values);
    }
  }

  function assignCrossButton() {
    crossButton = document.querySelectorAll(".cross-btn");
    crossButton.forEach((item) => {
      item.addEventListener("click", (event) => {
        removeFromCart(event.target.value);
        location.reload();
      });
    });
  }

  function renderCartOrdersBill(values) {
    let totalPrice = 0;
    let totalPriceTemplate;
    values.forEach((item) => {
      eachItem(item.name, item.price);
      totalPrice += Number(item.price);
    });
    if (totalPrice > 0) {
      if (totalPrice < 500) {
        let initialTotalPrice = totalPrice;
        totalPrice += 40;
        totalPriceTemplate = `<li class="border-t-2 mt-2 border-black border-dashed">
    ${initialTotalPrice} &#8377 + 40 &#8377 (Delivery charges) = ${totalPrice}  &#8377;
  </li>`;
      } else {
        totalPriceTemplate = `<li class="border-t-2 mt-2 border-black border-dashed">
    ${totalPrice} &#8377;
  </li>`;
      }
      let totalTemplate = `<li class="border-t-2 border-black mt-2 border-dashed">Total</li>`;
      itemsContainer.innerHTML += totalTemplate;
      priceContainer.innerHTML += totalPriceTemplate;
    } else {
    }
    assignCrossButton();
  }
  renderBasedOnOrder();

  function eachItem(bakeryItem, itemPrice) {
    let itemTemplate = `<li>${bakeryItem}</li>`;
    let priceTemplate = `<li>${itemPrice} &#8377;</li>`;
    let crossTemplate = ` <li><button class="cross-btn" value="${bakeryItem}">X</button></li>`;
    itemsContainer.innerHTML += itemTemplate;
    priceContainer.innerHTML += priceTemplate;
    crossContainer.innerHTML += crossTemplate;
  }
}
