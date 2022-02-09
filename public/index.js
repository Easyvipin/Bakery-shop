if (window.location.pathname === "/order.html") {
  const orderField = document.getElementById("order-name");
  const orderContainer = document.getElementById("order-container");
  const confirmContainer = document.getElementById("confirm-container");
  const orderDetails = document.getElementById("order-details");
  const userEmail = document.getElementById("user-email");
  const orderParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
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
