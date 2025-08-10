// src/hooks/useImageLoader.js
import { useState, useEffect } from 'react';

const useImageLoader = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    const image = new Image();
    image.src = src;
    
    image.onload = () => setLoaded(true);
    image.onerror = () => setError(true);

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return { loaded, error };
};

// Usage in component:
const MediaCard = ({ item }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const { loaded } = useImageLoader(posterUrl);
  
  return (
    <>
      {!loaded && (
        <div className="bg-gray-300 dark:bg-gray-700 rounded-xl aspect-[2/3] animate-pulse" />
      )}
      
      {loaded && (
        <img
          src={posterUrl}
          alt={item.title || item.name}
          className="w-full aspect-[2/3] object-cover"
        />
      )}
    </>
  );
};