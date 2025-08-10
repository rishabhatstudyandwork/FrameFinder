import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiLightningBolt } from 'react-icons/hi';
import { getSimilarMovies, getSimilarShows } from '../services/tmdb';

const FrameMatch = ({ mediaId, mediaType }) => {
  const [similarItems, setSimilarItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const data = mediaType === 'movie' 
          ? await getSimilarMovies(mediaId)
          : await getSimilarShows(mediaId);
        setSimilarItems(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching similar media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [mediaId, mediaType]);

  if (similarItems.length === 0 && !loading) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <HiLightningBolt className="text-yellow-500 text-xl" />
        <h2 className="text-2xl font-bold">FrameMatch Suggestions</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-video" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg">
                {item.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
                    alt={item.title || item.name}
                    className="w-full aspect-video object-cover group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-800 aspect-video flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-medium text-white truncate text-sm">
                    {item.title || item.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>★ {item.vote_average.toFixed(1)}</span>
                <span className="mx-1">•</span>
                <span>
                  {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrameMatch;