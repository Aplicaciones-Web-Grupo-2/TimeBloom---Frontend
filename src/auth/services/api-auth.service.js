import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(user) {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email: user.email,
    password: user.password
  });
  localStorage.setItem('token', response.data.token);
  return response.data;
}

export async function loginUser(email, password) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });
  localStorage.setItem('token', response.data.token);
  return response.data;
}
