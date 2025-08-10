import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Favorites ❤️</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. Go add some!</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
