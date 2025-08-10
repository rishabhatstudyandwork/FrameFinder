import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { getDetails, getVideos, getMovieCredits } from '../services/tmdb';
import FrameMatch from '../components/FrameMatch';
import ScreenshotGallery from '../components/ScreenshotGallery';
import TrailerPlayer from '../components/TrailerPlayer';
import { FaStar, FaClock, FaMoneyBillWave, FaSearch } from 'react-icons/fa';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]); // Store cast separately
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        // Fetch all data in parallel
        const [movieData, videoData, creditsData] = await Promise.all([
          getDetails(id, 'movie'),
          getVideos(id, 'movie'),
          getMovieCredits(id) // Fetch credits with cast
        ]);
        
        setMovie(movieData);
        
        // Find official trailer
        const trailer = videoData.results.find(
          v => v.type === 'Trailer' && v.official
        );
        
        if (trailer) setTrailerKey(trailer.key);
        
        // Set cast data
        if (creditsData.cast) {
          setCast(creditsData.cast.slice(0, 10)); // First 10 cast members
        }
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Format runtime
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  // Handle actor click - navigate to search
  const handleActorClick = (actorName) => {
    navigate(`/search?q=${encodeURIComponent(actorName)}`);
  };

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      <p className="mt-4">Loading movie details...</p>
    </div>
  );
  
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!movie) return <div className="text-center py-8">Movie not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-xl overflow-hidden">
        {movie.backdrop_path ? (
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w1400_and_h450_face${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral to-transparent"></div>
          </div>
        ) : (
          <div className="bg-gray-800 w-full h-64 md:h-96 flex items-center justify-center">
            <span className="text-gray-500">No backdrop available</span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
            <div className="flex-shrink-0 -mt-24 md:-mt-36">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-48 md:w-64 rounded-xl shadow-xl border-4 border-neutral"
                />
              ) : (
                <div className="bg-gray-700 border-4 border-neutral rounded-xl w-48 md:w-64 aspect-[2/3] flex items-center justify-center text-gray-500">
                  No poster
                </div>
              )}
            </div>
            
            <div className="flex-grow text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              <h2 className="text-xl md:text-2xl text-gray-300 italic mb-4">
                {movie.tagline}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center bg-accent/20 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-gray-400 ml-1">/10</span>
                </div>
                
                <div className="flex items-center bg-secondary/20 px-3 py-1 rounded-full">
                  <FaClock className="mr-2" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
                
                <div className="flex items-center bg-secondary/20 px-3 py-1 rounded-full">
                  <FaMoneyBillWave className="mr-2" />
                  <span>{formatCurrency(movie.budget)}</span>
                </div>
                
                <span className="bg-primary px-3 py-1 rounded-full text-sm">
                  {movie.release_date?.split('-')[0] || 'N/A'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map(genre => (
                  <span 
                    key={genre.id} 
                    className="px-3 py-1 bg-secondary/30 text-secondary rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Trailer Player */}
          {trailerKey && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Trailer</h2>
              </div>
              <TrailerPlayer youtubeKey={trailerKey} />
            </div>
          )}
          
          {/* Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              {movie.overview || 'No description available.'}
            </p>
          </div>
          
          {/* Enhanced Cast Section */}
          {cast.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Cast</h2>
                <div className="flex items-center text-sm text-gray-400">
                  <FaSearch className="mr-2" />
                  <span>Click any actor to search for them</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cast.map(person => (
                  <div 
                    key={person.id} 
                    className="bg-neutral/50 rounded-lg p-3 cursor-pointer hover:bg-neutral/70 transition transform hover:-translate-y-1 group"
                    onClick={() => handleActorClick(person.name)}
                  >
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                        loading="lazy"
                      />
                    ) : (
                      <div className="bg-gray-700 w-full h-48 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="group-hover:text-accent transition-colors">
                      <h3 className="font-semibold truncate">{person.name}</h3>
                      <p className="text-gray-400 text-sm truncate group-hover:text-secondary">
                        {person.character}
                      </p>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {person.known_for_department}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View All Cast Link */}
              <div className="mt-4 text-center">
                <button 
                  onClick={() => navigate(`/movie/${id}/cast`)}
                  className="inline-flex items-center text-accent hover:underline"
                >
                  View Full Cast
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Screenshots */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
            <ScreenshotGallery mediaId={id} mediaType="movie" />
          </div>
        </div>
        
        {/* Right Column - same as before */}
      </div>
      
      {/* FrameMatch */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Find Similar Frames</h2>
        <FrameMatch mediaId={id} mediaType="movie" />
      </div>
    </div>
  );
};

export default MovieDetail;