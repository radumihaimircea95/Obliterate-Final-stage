let shop = document.getElementById("shop");

/*
  Basket to hold all the selected items
  the getItem part is retrieving data from the local storage
  if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/*
   Generates the shop with product cards composed of
   images, title, price, buttons, description
 */

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, description, imgURL, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      
      <div class="details">
        <h3>${name}</h3>
        <img  src=${imgURL} alt="">
        <div class="card-information">
        <p>${description}</p>
        <a href="pages/details.html?id=${id}"><button type="button" class='item-details-btn'>Details</button></a>
        <div class="price-quantity">
          <h3>$ ${price} </h3>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();

/*
    increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/*
   decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/*
    update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/*
   calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

const addNewProductToShop = (product) => {
  shopItemsData.push(product);
  generateShop();
};

// Ascultă evenimentul de mesaj de la pagina de administrare (admin.html)
window.addEventListener("message", (event) => {
  if (event.data.action === "addProduct") {
    const product = event.data.product;
    addNewProductToShop(product);
  }
});
