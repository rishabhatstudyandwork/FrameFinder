// src/services/apiStatus.js
import axios from 'axios';

export const checkTmdbStatus = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/authentication', {
      params: { api_key: import.meta.env.VITE_TMDB_API_KEY }
    });
    return response.data.success ? 'Operational' : 'Unavailable';
  } catch (error) {
    return 'API Unavailable';
  }
};