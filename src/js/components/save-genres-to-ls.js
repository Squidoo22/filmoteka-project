import { getGenres } from '../api/movies-api';

// проверяет, есть ли объект с жанрами в локал сторедж и если нет то делает запрос и сохраняет

export default function saveGenres() {
    if (localStorage.getItem('genres')) return;

    getGenres()
        .then(data => {
            localStorage.setItem('genres', JSON.stringify(data.genres));
        })
        .catch(e => log('error:', e));
}