const genresArray = JSON.parse(localStorage.getItem('genres'));
const NO_IMG_URL = 'no-image.jpg';

// заменяет в объекте фильма полную дату на год, и меняет числовые данные
// в массиве жанров на слова

export default function changeData(array) {
    return array.map(elem => {
        elem.release_date = elem.release_date ? new Date(elem.release_date).getFullYear() : 'No date info'
        elem.poster_path = elem.poster_path ? 'https://image.tmdb.org/t/p/w500' + elem.poster_path : NO_IMG_URL;
        elem.genre_ids = replaceGenres(elem);
        return elem;
    })
}

function replaceGenres(movie) {
  if (movie.genres) {
    movie.genre_ids = movie.genres.map(elem => elem.id);
  }
  if (!movie.genre_ids || movie.genre_ids.length === 0) {
    movie.genre_ids[0] = 'No genre info';
  }
  if (movie.genre_ids.length > 3) {
    movie.genre_ids.length = 3;
    movie.genre_ids[2] = ' Other';
  }
  return movie.genre_ids.map((genreId, id) => {
    for (const key of genresArray) {
      if (key.id === genreId) {
        if (id === 0) return key.name;
        return ` ${key.name}`;
      }
    }
    return genreId;
  });
}
