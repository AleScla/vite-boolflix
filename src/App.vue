<script>

import {store} from './store.js';
import AppHeader from './components/AppHeader.vue';
import axios from 'axios';


export default {
  data() {
    return { 
      store
    }
  },
  // 2) Dichiarazione del componente
  components: {
    AppHeader
  },
  methods: {
    // funzione generale per la stampa dell'api dopo aver preso un valore dall'input
    StartAPI(){
      // richiesta films
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=e3bc7d75610ac968cc8e497e730d056c&language=it-IT',{
        params: {
          query: this.store.inputValue,
        }
      })
      .then((res)=>{
        this.inputClear()
        store.allFilms = res.data.results
      }),
      // richiesta serie tv
      axios.get('https://api.themoviedb.org/3/search/tv?api_key=e3bc7d75610ac968cc8e497e730d056c&language=it-IT',{
        params:{
          query: this.store.inputValue
        }
      })
      .then((res)=> {
        store.allSeries = res.data.results
      })
    },
    // pulisce la variabile inputValue per svuotare l'input text
    inputClear(){
      store.inputValue = ''
    },
    // stampa per le bandiere
    flagPrinter(lang){
      const flags = {
        en: 'GB',
        it: 'IT',
        ja: 'JP',
        fr: 'FR',
      }
      if(lang in flags){
        return 'https://flagsapi.com/' + flags[lang] + '/flat/64.png';
      }
      else{
        return 'https://www.novalibandiere.it/wp-content/uploads/jolly-roger_rackham.jpg';
      }
    },
  }
}
</script>

<template>
  <div>
    <!-- 3) Utilizzo del componente -->
    <AppHeader />
    
    <main class="w-100">
      <form @submit.prevent="StartAPI()" >
        <input type="text" v-model="this.store.inputValue">
        <button type="submit">
          INVIA
        </button>
          
        
      </form>
      <h2>FILMS</h2>
      <ul v-for="(film, i) in store.allFilms" :key="i">
            <li class="poster">
              <img v-if="film.poster_path != null" class="poster" :src="store.posterPath + film.poster_path">
              <p v-else><strong>COPERTINA NON DISPONIBILE</strong></p>
            </li>
            <li class="title w-100">Titolo: {{ film.title }}</li>
            <li class="original-title">Titolo originale: {{ film.original_title }}</li>
            <li class="language">Lingua originale: <img class="flags" :src="flagPrinter(film.original_language)"></li>
            <li class="rating">Voto: 
              <template v-for="n in Math.ceil((film.vote_average) / 2)">
                <i class="fa-solid fa-star"></i>
              </template>
              <template v-for="n in (5 - Math.ceil((film.vote_average) / 2))">
                <i class="fa-regular fa-star"></i>
              </template>  
            </li>
            <hr>
      </ul>
      <h2>SERIES</h2>
      <ul v-for="(series, i) in store.allSeries" :key="i">
            <li class="poster">
              <img v-if="series.poster_path != null" class="poster" :src="store.posterPath + series.poster_path">
              <p v-else><strong>COPERTINA NON DISPONIBILE</strong></p>
            </li>
            <li class="title w-100">Titolo: {{ series.name }}</li>
            <li class="original-title">Titolo originale: {{ series.original_name }}</li>
            <li class="language">Lingua originale: <img class="flags" :src="flagPrinter(series.original_language)"></li>
            <li class="rating">Voto: 
              <template v-for="n in Math.ceil((series.vote_average) / 2)">
                <i class="fa-solid fa-star"></i>
              </template>
              <template v-for="n in (5 - Math.ceil((series.vote_average) / 2))">
                <i class="fa-regular fa-star"></i>
              </template>  
            </li>
            <hr>  
      </ul>
    </main>
  </div>
</template>

<style lang="scss">
@use 'assets/scss/main' as *;
// Import all of Bootstrap's CSS
@import "bootstrap/scss/bootstrap";
.flags{
  width:60px;
}
</style>
