import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
});
// Add this helper function at the top
const handleApiError = (error) => {
  console.error('TMDB API Error:', error);
  throw new Error(`API request failed: ${error.message}`);
};

// Update all API calls with error handling
export const getTrending = (mediaType = 'all', timeWindow = 'week') => 
  tmdb.get(`/trending/${mediaType}/${timeWindow}`)
    .then(res => res.data.results)
    .catch(handleApiError);

// Repeat this pattern for all other functions


// Top rated media
export const getTopRated = (mediaType = 'movie') => 
  tmdb.get(`/${mediaType}/top_rated`).then(res => res.data.results);

// Popular media
export const getPopular = (mediaType = 'movie') => 
  tmdb.get(`/${mediaType}/popular`).then(res => res.data.results);

export const getPopularMovies = () => getPopular('movie');
export const getPopularShows = () => getPopular('tv');

// Media details
export const getDetails = async (id, type) => {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  return res.json();
};
// In services/tmdb.js
export const getVideos = async (id, mediaType) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Search
// Update searchMedia function
export const searchMedia = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    return response.data.results || [];
  } catch (error) {
    console.error('Error searching media:', error);
    return [];
  }
};
// Add to tmdb.js
export const getMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return { cast: [] };
  }
};

export const getPersonDetails = async (personId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/person/${personId}?api_key=${API_KEY}&append_to_response=combined_credits`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching person details:', error);
    return null;
  }
};
// IMDb-style top rated
export const getIMDbStyleTop = () => 
  tmdb.get('/discover/movie', {
    params: {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 10000,
      with_original_language: 'en'
    }
  }).then(res => res.data.results);

// By year
export const getByYear = (year) => 
  tmdb.get('/discover/movie', {
    params: {
      primary_release_year: year,
      sort_by: 'vote_average.desc',
      'vote_count.gte': 1000
    }
  }).then(res => res.data.results);

// Similar media
export const getSimilarMovies = (movieId) => 
  tmdb.get(`/movie/${movieId}/similar`).then(res => res.data.results);

export const getSimilarShows = (showId) => 
  tmdb.get(`/tv/${showId}/similar`).then(res => res.data.results);

// Media images
export const getMediaImages = (id, mediaType = 'movie') => 
  tmdb.get(`/${mediaType}/${id}/images`).then(res => res.data);