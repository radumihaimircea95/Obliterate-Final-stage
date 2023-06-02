import { addNewProduct, getAllProducts, deleteProduct } from "./products.js";
import { showConfirmationMessage } from "./utils.js";

const nameInputElement = document.querySelector(".add-product-form #name");
const imageInputElement = document.querySelector(".add-product-form #image");
const descriptionInputElement = document.querySelector(
  ".add-product-form #description"
);
const priceInputElement = document.querySelector(".add-product-form #price");
const sizeInputElement = document.querySelector(".add-product-form #size");
const genderInputElement = document.querySelector(".add-product-form #gender");
const quantityInputElement = document.querySelector(".add-product-form #qty");

const populateProductsTable = async () => {
  const products = await getAllProducts();
  console.log(products);

  const tableContent = products
    .map((product, index) => {
      return `
        <tr>
          <th scope="row">${index + 1}</th>
          <td><img src="${product.imgURL}" width="50" height="50"></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
            <button id="${product.id}" class="btn btn-danger delete-product">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <button class="btn btn-warning">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  const productTableBody = document.getElementById("product-table-body");
  if (productTableBody) {
    productTableBody.innerHTML = tableContent;
  }
};

const addProduct = async () => {
  const product = {
    name: nameInputElement.value,
    imgURL: imageInputElement.value,
    description: descriptionInputElement.value,
    price: priceInputElement.value,
    size: sizeInputElement.value,
    gender: genderInputElement.value,
    stock: quantityInputElement.value,
  };

  const response = await addNewProduct(product);
  showConfirmationMessage(
    "add-product-message",
    response,
    "Product successfully added!"
  );

  if (response.ok) {
    populateProductsTable();
    sendMessageToMainPage(product);
  }
};

const sendMessageToMainPage = (product) => {
  window.opener.postMessage(
    {
      action: "addProduct",
      product: product,
    },
    "*"
  );
};

const addNewItemButton = document.getElementById("add-item");
if (addNewItemButton) {
  addNewItemButton.addEventListener("click", addProduct);
}

const addNewProductButton = document.getElementById("add-new-product");
if (addNewProductButton) {
  addNewProductButton.addEventListener("click", () => {
    const addProductContainer = document.querySelector(
      ".add-product-container"
    );
    if (addProductContainer) {
      addProductContainer.classList.toggle("hidden");
    }
  });
}

const productTableBody = document.getElementById("product-table-body");
if (productTableBody) {
  productTableBody.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-product")) {
      const productId = event.target.id;
      const response = await deleteProduct(productId);
      if (response && response.ok) {
        await populateProductsTable();
      }
    }
  });
}

window.addEventListener("DOMContentLoaded", populateProductsTable);
