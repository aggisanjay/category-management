import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://category-management-fvw8.onrender.com', // Adjust based on your backend
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
