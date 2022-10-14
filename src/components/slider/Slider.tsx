import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import IMovie from "../../models/IMovie.model";
import { fetchMovies } from "../movies/utils";
export default function Slider() {
  let [movies, setMovies] = useState<IMovie[]>([]);
  let navigate = useNavigate();
  useEffect(() => {
    fetchMovies(1).then((res) => {
      setMovies(res);
    });
  }, []);
  let handleMovieClick = (id: number) => {
    // navigate(`movie/${id}`, { replace: true });
    window.location.replace(`/movie/${id}`);
  };
  return (
    <div className="swiperComponent">
      <h4>
        {" "}
        <span>&mdash; </span> Also you may like
      </h4>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          720: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1420: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {movies
          ? movies.splice(0, 10).map((movie, index) => (
              <SwiperSlide onClick={() => handleMovieClick(movie.id)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Movie Image"
                  key={index}
                />
                <div className="swiperComponent__txt">
                  <h5>{movie.title}</h5>
                </div>
              </SwiperSlide>
            ))
          : "hi"}
      </Swiper>
    </div>
  );
}
