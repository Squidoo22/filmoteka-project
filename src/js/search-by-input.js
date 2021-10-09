import { getSearchedMovies } from './api/movies-api';
import debounce from 'lodash.debounce';

const { log } = console;

document.querySelector('.js-search-form').addEventListener('input', debounce(onFilterChange, 500));

function onFilterChange(e) {
    log(e.target.value.toLowerCase())
    try {
        getSearchedMovies(e.target.value.toLowerCase())
            .then(log)
    } catch (e) {
        log('error', e);
    } finally {
        // block finally
    }   
}

