import axios from 'axios';

const API_URL = 'http://64.227.129.18:5000/api';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email, password) {
  return axios.post(`${API_URL}/auth/login`, { email, password });
}

export async function register(data) {
  return axios.post(`${API_URL}/auth/register`, data);
}

export async function getScrapRequests() {
  return axios.get(`${API_URL}/scrap`, { headers: authHeaders() });
}

export async function createScrapRequest(data) {
  return axios.post(`${API_URL}/scrap`, data, { headers: authHeaders() });
}

export async function updateScrapRequestStatus(id, status) {
  return axios.patch(`${API_URL}/scrap/${id}/status`, { status }, { headers: authHeaders() });
}
