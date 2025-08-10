import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiFilter, HiX } from 'react-icons/hi';
import { getPopularMovies, getPopularShows } from '../services/tmdb';

const MOOD_PALETTES = {
  vibrant: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C'],
  moody: ['#2D3047', '#419D78', '#E0A458', '#1B1B1E'],
  pastel: ['#FFC6FF', '#BDB2FF', '#A0C4FF', '#9BF6FF'],
  earth: ['#6B705C', '#A5A58D', '#B7B7A4', '#DDBEA9']
};

const VisualDiscovery = () => {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    mood: null,
    color: null,
    genre: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const movies = await getPopularMovies();
        const shows = await getPopularShows();
        const combined = [...movies.slice(0, 10), ...shows.slice(0, 10)];
        setMedia(combined);
        setFilteredMedia(combined);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    let result = [...media];
    
    if (activeFilters.mood) {
      result = result.filter(item => {
        const moodKeywords = activeFilters.mood === 'vibrant' 
          ? ['comedy', 'animation', 'music'] 
          : activeFilters.mood === 'moody'
            ? ['drama', 'thriller', 'horror']
            : ['family', 'romance', 'fantasy'];
        return item.genre_ids.some(id => 
          moodKeywords.some(kw => kw.toLowerCase().includes(kw))
        );
      });
    }
    
    setFilteredMedia(result);
  }, [activeFilters, media]);

  const applyFilter = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({ mood: null, color: null, genre: null });
  };

  const getColorScheme = (mood) => {
    return MOOD_PALETTES[mood] || MOOD_PALETTES.vibrant;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
          Visual Discovery
        </h1>
        <button 
          onClick={clearFilters}
          className="flex items-center gap-1 text-gray-400 hover:text-accent transition-colors"
          disabled={!activeFilters.mood && !activeFilters.color && !activeFilters.genre}
        >
          <HiX />
          <span>Clear filters</span>
        </button>
      </div>

      {/* Mood Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Mood</h2>
        <div className="flex flex-wrap gap-3">
          {Object.keys(MOOD_PALETTES).map(mood => (
            <button
              key={mood}
              onClick={() => applyFilter('mood', mood)}
              className={`px-4 py-2 rounded-full capitalize transition-all ${
                activeFilters.mood === mood
                  ? 'bg-accent text-primary'
                  : 'bg-neutral hover:bg-neutral/80'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-xl aspect-[3/4]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item, index) => {
            const colors = getColorScheme(activeFilters.mood || 'vibrant');
            const bgColor = colors[index % colors.length];
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group overflow-hidden rounded-xl shadow-xl"
              >
                <div 
                  className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: bgColor }}
                />
                
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="relative z-10 w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="relative z-10 w-full aspect-[3/4] flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="font-bold text-white truncate">
                    {item.title || item.name}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-300">
                    <span>★ {item.vote_average.toFixed(1)}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VisualDiscovery;