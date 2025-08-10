import React from 'react';

const FilmCard = ({ film }) => {
  return (
    <div className="film-card">
      <h3>{film.title || film.name}</h3>
    </div>
  );
};

export default FilmCard;
