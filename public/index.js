import * as orderData from "./orders.json" assert { type: "json" };

const cartButton = document.querySelectorAll(".cart-btn");
const cartItems = document.querySelector("#cart-items");
let totalPrice = 0;
let deliveryCharges = 100;

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
  } else {
    removeFromCart(orderInf.name);
    event.target.dataset.type = "add";
    event.target.innerHTML = "Add &#x1F6D2;";
  }
}

/* assign the listener to btns */
cartButton.forEach((item) => {
  item.addEventListener("click", addToCart);
});

/* get order details from json data */
function getOrderDetails(orderName) {
  return orderData.default[`${orderName}`].price;
}

function renderOrderUrl(orderValues) {
  return `./order.html?cake=${orderValues}`;
}

const getCartItems = () => {
  const ordersFromStorage = JSON.parse(localStorage.getItem("orders"));
  return ordersFromStorage;
};

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
  renderCartStats();
}

renderCartStats();

/* render cart status when cart action happens */
function renderCartStats() {
  const items = getCartItems();
  cartItems.innerHTML = items.length;
}
/* setCartItems(orderInformation); */

if (window.location.pathname === "/order.html") {
  const orderField = document.getElementById("order-name");
  const orderContainer = document.getElementById("order-container");
  const confirmContainer = document.getElementById("confirm-container");
  const orderDetails = document.getElementById("order-details");
  const userEmail = document.getElementById("user-email");

  confirmContainer.style.display = "none";
  orderField.innerHTML = `&#x2705; ${orderParams.cake || orderParams.snack}`;

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
}

/* Billing */

function renderBasedOnOrder() {
  const orderParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if (orderParams.cake) {
    renderOneOrderBill();
  } else {
    renderCartOrdersBill();
  }
}

function renderCartOrdersBill() {}
