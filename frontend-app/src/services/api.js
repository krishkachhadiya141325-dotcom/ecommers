import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('hf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerAPI = (data) => API.post('/auth/register', data);
export const loginAPI = (data) => API.post('/auth/login', data);
export const getMeAPI = () => API.get('/auth/me');
export const logoutAPI = () => API.post('/auth/logout');

export const getProductsAPI = (params) => API.get('/products', { params });
export const getProductByIdAPI = (id) => API.get(`/products/${id}`);
export const createProductAPI = (data) => API.post('/products', data);
export const updateProductAPI = (id, data) => API.put(`/products/${id}`, data);
export const deleteProductAPI = (id) => API.delete(`/products/${id}`);
export const addReviewAPI = (id, data) => API.post(`/products/${id}/reviews`, data);

export const getCartAPI = () => API.get('/cart');
export const addToCartAPI = (productId, quantity) => API.post('/cart', { productId, quantity });
export const updateCartItemAPI = (productId, quantity) => API.put(`/cart/${productId}`, { quantity });
export const removeFromCartAPI = (productId) => API.delete(`/cart/${productId}`);
export const clearCartAPI = () => API.delete('/cart');

export const placeOrderAPI = (data) => API.post('/orders', data);
export const getMyOrdersAPI = () => API.get('/orders/my');
export const getAllOrdersAPI = () => API.get('/orders');
export const updateOrderStatusAPI = (id, status) => API.put(`/orders/${id}/status`, { status });
export const getOrderStatsAPI = () => API.get('/orders/stats');
