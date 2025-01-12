import axios from 'axios';

// Base configuration for Axios
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Your FastAPI backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Wallet APIs
export const getWallets = async () => {
  const response = await apiClient.get('/wallets');
  return response.data;
};

export const addWallet = async (wallet) => {
  const response = await apiClient.post('/wallets', wallet);
  return response.data;
};

// Token APIs
export const getTokens = async () => {
  const response = await apiClient.get('/tokens');
  return response.data;
};

export const addToken = async (token) => {
  const response = await apiClient.post('/tokens', token);
  return response.data;
};

// Trade APIs
export const getTrades = async () => {
  const response = await apiClient.get('/trades');
  return response.data;
};

export const addTrade = async (trade) => {
  const response = await apiClient.post('/trades', trade);
  return response.data;
};

// Pair APIs
export const getPairs = async () => {
  const response = await apiClient.get('/pairs');
  return response.data;
};

export const addPair = async (trade) => {
  const response = await apiClient.post('/pairs', trade);
  return response.data;
};

// Agg Trades APIs
export const getAggregatedTrades = async () => {
  const response = await apiClient.get('/aggregated-trades'); 
  return response.data;
};