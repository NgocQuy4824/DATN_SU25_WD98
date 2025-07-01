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