import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb';

const useMediaFetch = (type = 'movie', query = '') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        if (query) {
          response = type === 'movie' 
            ? await tmdbService.searchMovies(query)
            : await tmdbService.searchTVShows(query);
        } else {
          response = type === 'movie'
            ? await tmdbService.getPopularMovies()
            : await tmdbService.getPopularTVShows();
        }
        
        setData(response.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, query]);

  return { data, loading, error };
};

export default useMediaFetch;
