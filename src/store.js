import {reactive} from 'vue';

export const store = reactive ({
    inputValue: "",
    allFilms:[],
    allSeries:[],
    posterPath: 'https://image.tmdb.org/t/p/h632'
})