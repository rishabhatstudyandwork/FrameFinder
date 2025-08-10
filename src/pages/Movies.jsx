import React, { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid';
import { getPopularMovies } from '../services/tmdb';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError('Failed to load movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <MediaGrid 
        items={movies.map(m => ({ ...m, media_type: 'movie' }))} 
        isLoading={loading} 
      />
    </div>
  );
};

export default Movies;