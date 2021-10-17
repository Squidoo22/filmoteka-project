// проверяет, есть ли объект с жанрами в локал сторедж и если нет то делает запрос и сохраняет

const API_KEY = '9f0e1a5db1805e19173b01041df22dc3';

const getGenres = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const data =  await response.json();
        return data;
    } catch (e) {
        console.log(e);
    } finally {
        //
    }
};

function saveGenres() {
    if (localStorage.getItem('genres')) return;

    getGenres()
        .then(data => {
            const genres = data.genres;
            console.log('genres', genres);
            localStorage.setItem('genres', JSON.stringify(data.genres));
        })
        .catch(e => console.log('error:', e));
}

saveGenres();