import axios from "axios";
export let fetchMovies = async (page: number) => {
  let res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=eeee22e2df21bf61c522058720ee51c9&language=en-US&page=${page}`
  );
  return res.data.results;
};

//https://image.tmdb.org/t/p/w500
