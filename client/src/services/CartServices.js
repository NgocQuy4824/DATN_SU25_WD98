import API from "../config/app.js";

export const addToCart = async ({ productId, variantId, quantity }) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.post(
    '/cart/add',
    { productId, variantId, quantity },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};


export const getMyCart = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.get('/cart/my-cart', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const removeAllCart = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.delete('/cart/items', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const removeCartItem = async (variantId) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.delete(`/cart/item/${variantId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateCartItemQuantity = async ({ productId, variantId, quantity }) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await API.patch(
    '/cart/updatequantity-item',
    { productId, variantId, quantity },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};