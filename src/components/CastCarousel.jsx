import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CastCarousel = ({ cast }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={15}
      slidesPerView={2}
      navigation
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
      }}
    >
      {cast.map(person => (
        <SwiperSlide key={person.id}>
          <div className="bg-neutral/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="bg-gray-700 w-full h-48 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <div className="p-3">
              <h3 className="font-semibold truncate">{person.name}</h3>
              <p className="text-gray-400 text-sm truncate">{person.character}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CastCarousel;