let totalPrice = 0;
let deliveryCharges = 100;
let cakeContainer = document.querySelector(".cake-container");
const orderData = {
  stawberry: {
    name: "stawberry",
    price: "180",
  },
  butterscotch: {
    name: "butterscotch",
    price: "200",
  },
  dorimon: {
    name: "dorimon",
    price: "200",
  },
  redvalvet: {
    name: "redvalvet",
    price: "250",
  },
  pineapple: {
    name: "pineapple",
    price: "180",
  },
  blackforest: {
    name: "blackforest",
    price: "200",
  },
  chocolate: {
    name: "chocolate",
    price: "200",
  },
  vanilla: {
    name: "vanilla",
    price: "200",
  },
  cap: {
    name: "cap",
    price: "50",
  },
  designcap: {
    name: "designcap",
    price: "50",
  },
  musicalknife: {
    name: "musicalknife",
    price: "50",
  },
  metallicbaloons: {
    name: "metallicbaloons",
    price: "120",
    pcs: "50",
  },
  heartbaloons: {
    name: "heartbaloons",
    price: "40",
    pcs: "20",
  },
  knifes: {
    name: "knifes",
    price: "10",
  },
};

const renderAllCakes = () => {
  Object.keys(orderData).forEach((item, index) => {
    if (index <= 7 && cakeContainer) {
      cakeContainer.innerHTML += `
    <div class="card hover:shadow-lg">
    <img
      class="w-full h-32 sm:h-48 border-b-8 border-orange-900 object-cover"
      src="./image/${orderData[item].name}.jpg"
      alt=""
    />
    <div class="flex justify-between items-center">
      <div class="m-4">
        <span class="font-bold text-black">${orderData[item].name}</span>
        <span class="block text-sm text-orange-900">1 Pond</span>
      </div>

      <div
        class="mt-4 px-5 py-3 bg-black text-orange-500 rounded-t rounded-l rounded-r-none rounded-tr-none shadow-lg"
      >
        <a href="./order.html?cake=${orderData[item].name}">Order</a>
      </div>
    </div>
    <div class="badge">
      <span>₹ ${orderData[item].price} </span>
    </div>
    <button
      class="mt-4 px-2 py-1 bg-black bg-opacity-75 font-bold text-white border-2 border-white rounded shadow-lg absolute top-0 right-0 mr-4 cart-btn"
      value="${orderData[item].name}"
      data-type="add"
    >
      Add &#x1F6D2;
    </button>
  </div>
    `;
    }
  });
};
renderAllCakes();

const cartButton = document.querySelectorAll(".cart-btn");
const cartItems = document.querySelector("#cart-items");

function addToCart(event) {
  const orderInf = {
    name: event.target.value,
    price: getOrderDetails(event.target.value),
  };
  if (event.target.dataset.type === "add") {
    event.target.innerHTML = "Remove &#x2796;";
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
  const ordersFromStorage = JSON.parse(localStorage.getItem("orders"));
  return ordersFromStorage;
};

const alreadyInCart = getCartItems();
function checkItemInCart(value, cartItems) {
  let check = cartItems?.some((item) => item.name === value);
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
  location.reload();
}

/* render cart status when cart action happens */
function renderCartStats() {
  const items = getCartItems();
  if (cartItems) {
    cartItems.innerHTML = items?.length || 0;
  }
}
if (window.location.pathname !== "/order.html") {
  renderCartStats();
}

/* setCartItems(orderInformation); */

if (window.location.pathname === "/order.html") {
  const orderField = document.getElementById("order-name");
  const orderContainer = document.getElementById("order-container");
  const billContainer = document.getElementById("bill-container");
  const confirmContainer = document.getElementById("confirm-container");
  const orderDetails = document.getElementById("order-details");
  const userEmail = document.getElementById("user-email");
  const itemsContainer = document.getElementById("items");
  const priceContainer = document.getElementById("price");
  const crossContainer = document.getElementById("cross");
  const proceedBtn = document.querySelector(".proceed");
  const partyNeed = document.querySelector(".party-need");
  let crossButton;

  orderContainer.style.display = "none";
  proceedBtn.addEventListener("click", () => {
    billContainer.style.display = "none";
    orderContainer.style.display = "flex";
  });

  const orderParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

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
    const listOutItems = getCartItems();
    const orderTemplate = listOutItems?.map(
      (item) => `${item.name} --> ${item.price} \n`
    );
    ConfirmOrderString = `Ordered: ${
      orderParams.cake || orderTemplate.join(" ")
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
    const values = getCartItems();
    if (orderParams.cake) {
      const singleItem = {
        name: orderParams.cake,
        price: getOrderDetails(orderParams.cake),
      };
      renderCartOrdersBill([singleItem, ...values]);
    } else {
      renderCartOrdersBill(values);
    }
  }

  function assignCrossButton() {
    crossButton = document.querySelectorAll(".cross-btn");
    crossButton?.forEach((item) => {
      item.addEventListener("click", (event) => {
        removeFromCart(event.target.value);
        location.reload();
      });
    });
  }

  function renderCartOrdersBill(values) {
    let totalPrice = 0;
    let totalPriceTemplate;
    values?.forEach((item) => {
      eachItem(item.name, item.price);
      totalPrice += Number(item.price);
    });
    if (totalPrice > 0) {
      if (totalPrice < 500) {
        let initialTotalPrice = totalPrice;
        totalPrice += 40;
        totalPriceTemplate = `<li class="border-t-2 mt-2 md:text-sm text-xs border-black border-dashed">
    ${initialTotalPrice} &#8377 + 40 &#8377 (Delivery charges) = ${totalPrice}  &#8377;
  </li>`;
      } else {
        totalPriceTemplate = `<li class="border-t-2 mt-2 md:text-sm text-xs border-black border-dashed">
    ${totalPrice} &#8377 + 0 &#8377 (Delivery charges) = ${totalPrice} &#8377;
  </li>`;
      }
      let totalTemplate = `<li class="border-t-2 md:text-sm text-xs border-black mt-2 border-dashed">Total</li>`;
      itemsContainer.innerHTML += totalTemplate;
      priceContainer.innerHTML += totalPriceTemplate;
    } else {
    }
    assignCrossButton();
  }
  renderBasedOnOrder();

  function eachItem(bakeryItem, itemPrice) {
    let itemTemplate = `<li class="mt-2 md:text-sm text-xs">${bakeryItem}</li>`;
    let priceTemplate = `<li class="mt-2 md:text-sm text-xs">${itemPrice} &#8377;</li>`;
    let crossTemplate = ` <li class="mt-2 md:text-sm text-xs"><button class="cross-btn font-bold  px-4 border-black rounded hover:bg-black hover:text-white" value="${bakeryItem}">X</button></li>`;
    itemsContainer.innerHTML += itemTemplate;
    priceContainer.innerHTML += priceTemplate;
    crossContainer.innerHTML += crossTemplate;
  }
  if (alreadyInCart.length === 0 && !orderParams.cake) {
    const emptyContainer = document.querySelector(".billing-body");
    if (emptyContainer) {
      emptyContainer.innerHTML = ` <div class="empty-cart flex flex-col items-center">
      <img src="./image/empty-cart.png" class="w-1/2" alt="" />
      <a
        class="bg-gray-100 p-2 font-mono md:text-xl text-large font-bold outline-none hover:bg-yellow-300 transform transition-transform ease-in duration-150 hover:scale-110 rounded"
        href="./index.html"
      >
        Shop Now &#x1F9FA;
      </a>
    </div>`;
    }
  }
}
