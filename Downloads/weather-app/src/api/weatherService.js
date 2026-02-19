import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;
const BASE_URL = 'http://api.weatherstack.com';

const weatherClient = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
});

export const getCurrentWeather = async (query) => {
  try {
    const response = await weatherClient.get('/current', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getHistoricalWeather = async (query, date) => {
  try {
    // date format: YYYY-MM-DD
    const response = await weatherClient.get('/historical', {
      params: { query, historical_date: date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};

export const getMarineWeather = async (query) => {
  try {
    const response = await weatherClient.get('/marine', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching marine weather:', error);
    throw error;
  }
};
