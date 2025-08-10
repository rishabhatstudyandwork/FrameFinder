import React, { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid';
import { getPopularShows } from '../services/tmdb';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const data = await getPopularShows();
        setShows(data);
      } catch (err) {
        setError('Failed to load TV shows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShows();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular TV Shows</h1>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <MediaGrid 
        items={shows.map(s => ({ ...s, media_type: 'tv' }))} 
        isLoading={loading} 
      />
    </div>
  );
};

export default TVShows;