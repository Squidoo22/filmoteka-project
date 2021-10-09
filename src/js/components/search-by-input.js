import { getSearchedMovies } from '../api/movies-api';
import debounce from 'lodash.debounce';
import movieCardsTpl from '../../templates/movie-card.hbs';

const refs = {
    inputField: document.querySelector('.js-search-form'),
    outputField: document.querySelector('#gallery')
}

// const { log } = console;

refs.inputField.addEventListener('input', debounce(onFilterChange, 500));

function onFilterChange(e) {
    const inputValue = e.target.value.toLowerCase().trim();
    if (!inputValue) return;
    try {
        getSearchedMovies(inputValue)
            .then(data => {
                // log(data.results);
                const markUp = movieCardsTpl(data.results)
                refs.outputField.innerHTML = markUp;
            })
    } catch (e) {
        log('error', e);
    } finally {
        // block finally
    }   
}