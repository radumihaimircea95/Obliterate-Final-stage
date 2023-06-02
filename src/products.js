const PRODUCTS_URL = `https://633028d1591935f3c88ad2bb.mockapi.io/products`;

export const getAllProducts = async () => {
  const result = await fetch(PRODUCTS_URL);
  const products = await result.json();

  return products;
};

export const getProductsById = async (id) => {
  const result = await fetch(PRODUCTS_URL + id);
  const product = await result.json();

  return product;
};

export const addNewProduct = async (product) => {
  const response = await fetch(PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response;
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "DELETE",
  });

  return response;
};
