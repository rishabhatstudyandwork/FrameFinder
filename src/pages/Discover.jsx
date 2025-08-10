import React, { useState, useEffect } from 'react';
import MediaFilter from '../components/MediaFilter';
import MediaGrid from '../components/MediaGrid';
import { 
  getTrending, 
  getTopRated, 
  getPopular, 
  getIMDbStyleTop,
  getByYear
} from '../services/tmdb';

const Discover = () => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('trending');
  const [apiError, setApiError] = useState(null);
  
  const filters = [
    { id: 'trending', label: 'Trending Now' },
    { id: 'imdb-top', label: 'IMDb Top Rated' },
    { id: 'popular-movies', label: 'Popular Movies' },
    { id: 'popular-shows', label: 'Popular Shows' },
    { id: 'this-year', label: 'Best of 2024' },
    { id: 'last-year', label: 'Best of 2023' },
    { id: 'all-time', label: 'All-Time Greats' }
  ];

  useEffect(() => {
    const fetchMedia = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        let data = [];
        
        switch(activeFilter) {
          case 'trending':
            data = await getTrending('all', 'week');
            break;
          case 'imdb-top':
            data = await getIMDbStyleTop();
            break;
          case 'popular-movies':
            data = await getPopular('movie');
            break;
          case 'popular-shows':
            data = await getPopular('tv');
            break;
          case 'this-year':
            data = await getByYear(2024);
            break;
          case 'last-year':
            data = await getByYear(2023);
            break;
          case 'all-time':
            data = await getTopRated('movie');
            break;
          default:
            data = await getTrending();
        }
        
        // Add media_type for proper routing
        data = data.map(item => ({
          ...item,
          media_type: item.media_type || 
            (activeFilter.includes('movie') ? 'movie' : 
             activeFilter.includes('show') ? 'tv' : 
             item.first_air_date ? 'tv' : 'movie')
        }));
        
        setMedia(data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching media:', error);
        setApiError('Failed to load media. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedia();
  }, [activeFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discover</h1>
      
      {apiError && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {apiError}
        </div>
      )}
      
      <MediaFilter 
        filters={filters} 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter} 
      />
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {filters.find(f => f.id === activeFilter)?.label}
        </h2>
        <MediaGrid items={media} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Discover;