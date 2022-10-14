import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import IMovie from "../../models/IMovie.model";
import { fetchMovies } from "./utils";
import Loading from "../Loading";

export default function Movies() {
  let [movies, setMovies] = useState<IMovie[]>();
  let navigate = useNavigate();
  let location = useLocation();
  let page: number =
    Number(new URLSearchParams(location.search).get("page")) || 1;
  useEffect(() => {
    fetchMovies(page).then((data) => {
      setMovies(data);
    });
  }, [page]);

  // HANDLE: Next button click event
  let handleNextPage = () => {
    window.scrollTo(0, 600);
    navigate(`?page=${page + 1}`);
  };

  // HANDLE: Previos button click event
  let handlePrevPage = () => {
    if (page > 1) {
      window.scrollTo(0, 600);
      navigate(`?page=${page - 1}`);
    }
  };
  // HANDLE: Move to Movie Details
  let handleMovieNavigate = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <section className="movies">
      <div className="container">
        {/* STYLE: header */}
        <div className="movies__header">
          <h5>
            <span>&mdash; </span> Most Popular Films
          </h5>
        </div>
        {/* STYLE: Movies */}
        <div className="movies__content">
          {movies ? (
            movies.map((movie, index) => (
              <div
                className="movie"
                key={index}
                onClick={() => handleMovieNavigate(movie.id)}
              >
                {/* ------------ Movie Image */}
                <LazyLoadImage
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt="Movie Image"
                  className="movie__img"
                  effect="blur"
                />
                <div className="movie__txt">
                  {/* ------------ Movie Title */}
                  {movie.title.split(" ").length > 3 ? (
                    <h6 className="movie__txt-title">
                      {movie.title.split(" ").splice(0, 3).join(" ")}...
                    </h6>
                  ) : (
                    <h6 className="movie__txt-title">{movie.title}</h6>
                  )}
                  {/* ------------ Movie Rate */}
                  <div className="movie__txt-rate">
                    <div className="">
                      {new Array(5).fill(0).map((star, index) => (
                        <i
                          className={`fa-solid fa-star ${
                            Math.ceil(movie.vote_average / 2) > index + 1
                              ? ""
                              : "star__opacity"
                          }`}
                          key={index}
                        ></i>
                      ))}
                    </div>
                    <span>({movie.vote_count} vote)</span>
                  </div>
                  <div className="movie__txt-date">
                    <p>{movie.release_date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
        {/* --------------- STYLE: Next and Previous Buttons */}
        <div className="movies__buttons">
          <div
            className="movies__buttons-prev movies__buttons-btn"
            onClick={handlePrevPage}
          >
            <span>&lang;</span>
          </div>
          <div
            className="movies__buttons-next movies__buttons-btn"
            onClick={handleNextPage}
          >
            <span>&rang;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
