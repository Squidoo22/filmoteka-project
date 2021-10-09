import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjI2ZDJjYmI3ZWQ0OGZlM2YzZTcwZDNjNzU3NDYwMiIsInN1YiI6IjYxNTVlZjE0ZGQ3MzFiMDA2MjA0ZTZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kX2wm4V3sop5bu7gINsXfhNmhSJC64YPPiIbFqqCReM';

// Щоб відображались картинки потрібно при рендерингу додавати
// ось цей url + картинка, ширину в url можна міняти(там зараз 500)

//  const urlComponent = 'https://image.tmdb.org/t/p/w500';
//   movies.map((el) => {
//     <img src={urlComponent + el.poster_path} alt="" />
//   }

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`/trending/movie/week?page=${page}`);
    const data = await response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};

export const getSearchedMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `/search/movie?language=en-US&query=${query}&page=${page}&include_adult=false`,
    );
    const data = await response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};

export const getMovieById = async id => {
  try {
    const response = await axios.get(`/movie/${id}&language=en-US`);
    const data = await response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`/genre/movie/list?language=en-US`);
    const data = await response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};
