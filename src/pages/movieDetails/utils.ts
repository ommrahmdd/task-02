import axios from "axios";
export let getMovie = async (id: number) => {
  let res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=eeee22e2df21bf61c522058720ee51c9&language=en-US`
  );
  return res.data;
};
