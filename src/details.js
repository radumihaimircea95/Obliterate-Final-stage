let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

const showProductDetails = async () => {
  const searchParamString = window.location.search;

  const searchParams = new URLSearchParams(
    searchParamString.substring(1, searchParamString.lenght)
  );
  const productID = searchParams.get("id");
  const productURL = `https://633028d1591935f3c88ad2bb.mockapi.io/products/${productID}`;
  const result = await fetch(productURL);
  const productInfo = await result.json();

  const productCardDetails = `
  <div class ='card-details-page'>
    <img src = '${productInfo.imgURL}' class="img-details-page"/>
    <div class = 'product-details-section'>
        <p>Band name: <span>${productInfo.name}</span></p>
        <p>Size: <span>${productInfo.size}</span></p>
        <p>Gender: <span>${productInfo.gender}</span></p>
        <p>Description: <span>${productInfo.description}</span></p>
        <p>Stock: <span>${productInfo.stock}</span></p>
        <p>Price:<span>${productInfo.price}</span></p>
        <div>
          <button class="details-page-btn"><a href="../index.html">Shop now</a></button>
          
        </div>
        
    </div>
  
  
  </div>`;

  document.querySelector(".product-details").innerHTML = productCardDetails;
};

window.addEventListener("DOMContentLoaded", showProductDetails);
