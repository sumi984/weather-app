import axios from 'axios';

export default async function handler(request, response) {
    const { query, endpoint, ...params } = request.query;
    const API_KEY = process.env.VITE_WEATHERSTACK_API_KEY;

    if (!API_KEY) {
        return response.status(500).json({ error: 'API Key missing on server' });
    }

    const url = `http://api.weatherstack.com/${endpoint || 'current'}`;

    try {
        const apiResponse = await axios.get(url, {
            params: {
                access_key: API_KEY,
                query: query,
                ...params
            }
        });

        response.status(200).json(apiResponse.data);
    } catch (error) {
        console.error('Weather API Error:', error.message);
        response.status(500).json({ error: 'Failed to fetch weather data' });
    }
}
