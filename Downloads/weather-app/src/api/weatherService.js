import axios from 'axios';

const BASE_URL = '/api/weather';

const weatherClient = axios.create({
  baseURL: BASE_URL,
});

export const getCurrentWeather = async (query) => {
  try {
    const response = await weatherClient.get('', {
      params: {
        query,
        endpoint: 'current'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getHistoricalWeather = async (query, date) => {
  try {
    const response = await weatherClient.get('', {
      params: {
        query,
        endpoint: 'historical',
        historical_date: date
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};

export const getMarineWeather = async (query) => {
  try {
    const response = await weatherClient.get('', {
      params: {
        query,
        endpoint: 'marine'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching marine weather:', error);
    throw error;
  }
};
