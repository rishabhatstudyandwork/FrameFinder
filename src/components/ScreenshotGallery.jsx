import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import { getMediaImages } from '../services/tmdb';

const ScreenshotGallery = ({ mediaId, mediaType }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getMediaImages(mediaId, mediaType);
        setImages(data.backdrops.slice(0, 12)); // Get first 12 backdrops
      } catch (error) {
        console.error('Error fetching media images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [mediaId, mediaType]);

  const openLightbox = (index) => {
    setSelectedImage(index);
    document.body.classList.add('overflow-hidden');
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.classList.remove('overflow-hidden');
  };

  const navigateImage = (direction) => {
    setSelectedImage(prev => {
      if (direction === 'prev') {
        return prev === 0 ? images.length - 1 : prev - 1;
      } else {
        return prev === images.length - 1 ? 0 : prev + 1;
      }
    });
  };

  if (loading || images.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Key Frames</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.file_path}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => openLightbox(index)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
              alt={`Screenshot ${index + 1}`}
              className="w-full aspect-video object-cover hover:opacity-90 transition-opacity"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white text-2xl z-10"
            onClick={closeLightbox}
          >
            <HiX />
          </button>
          
          <button
            className="absolute left-4 text-white text-2xl z-10 p-2 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
          >
            <HiChevronLeft />
          </button>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-5xl max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${images[selectedImage].file_path}`}
              alt={`Screenshot ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </motion.div>
          
          <button
            className="absolute right-4 text-white text-2xl z-10 p-2 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
          >
            <HiChevronRight />
          </button>
          
          <div className="absolute bottom-4 text-white text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScreenshotGallery;