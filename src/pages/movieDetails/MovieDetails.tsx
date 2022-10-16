import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import IMovie from "../../models/IMovie.model";
import { getMovie } from "./utils";
import Slider from "../../components/slider/Slider";
export default function MovieDetails() {
  let { movieID } = useParams();
  let [movie, setMovie] = useState<IMovie>();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getMovie(Number(movieID)).then((data) => {
      setMovie(data);
    });
  }, [movieID]);

  return (
    <div className="moviePage">
      <div className="container">
        <div className="moviePage__content">
          <div className="moviePage__content-left">
            {movie ? (
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Image Movie"
                className="movieDetails__img"
                effect="blur"
              />
            ) : (
              <Loading />
            )}
          </div>
          <div className="moviePage__content-right">
            {movie ? (
              <div className="movieDetails">
                <div className="movieDetails__release">#{movie.status}</div>
                <h2 className="movieDetails__title">{movie.title}</h2>
                {movie.tagline ? (
                  <p className="movieDetails__tagline">
                    <span>&ldquo;</span>
                    {movie.tagline}
                    <span>”</span>
                  </p>
                ) : (
                  ""
                )}
                <p className="movieDetails__overview">{movie.overview}</p>
                <div className="movieDetails__date">
                  <span>Release Date</span>
                  <p>{movie.release_date}</p>
                </div>
                <div className="movieDetails__rate">
                  <span>Rate</span>
                  <div className="">
                    {new Array(5).fill(0).map((star, index) => (
                      <i
                        className={`fa-solid fa-star ${
                          Math.ceil(movie!.vote_average / 2) > index + 1
                            ? ""
                            : "star__opacity"
                        }`}
                        key={index}
                      ></i>
                    ))}{" "}
                    ({movie.vote_count}) vote
                  </div>
                </div>
                {movie.homepage ? (
                  <div className="movieDetails__homepage">
                    <span>Source</span>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      className="movieDetails__homepage-link"
                    >
                      {movie.homepage}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                <div className="movieDetails__genres">
                  {movie.genres?.map((gen, index) => (
                    <span key={index}>#{gen.name}</span>
                  ))}
                </div>
                <div className="movieDetails__companies">
                  {movie.production_companies?.map((company, index) => {
                    if (company.logo_path)
                      return (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                          alt="production company image"
                          key={index}
                        />
                      );
                    else
                      return (
                        <div
                          key={index}
                          className="movieDetails__companies-txt"
                        >
                          {company.name} <span>Company</span>
                        </div>
                      );
                  })}
                </div>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="slider">
          <Slider />
        </div>
      </div>
    </div>
  );
}
