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
    StartAPI(){
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=e3bc7d75610ac968cc8e497e730d056c&language=it-IT',{
        params: {
          query: this.store.inputValue,
        }
      })
      .then((res)=>{
        console.log(res.data.results);
        this.arrayClear()
        store.allFilms = res.data.results
        console.log('allFilms:', store.allFilms)
        // this.arrayClear()
      }),
      axios.get('https://api.themoviedb.org/3/search/tv?api_key=e3bc7d75610ac968cc8e497e730d056c&language=it-IT',{
        params:{
          query: this.store.inputValue
        }
      })
      .then((res)=> {
        console.log(res.data.results)
        store.allSeries = res.data.results
      })
    },
    arrayClear(){
      store.inputValue = ''
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
            <li class="title w-100">Titolo: {{ film.title }}</li>
            <li class="original-title">Titolo originale: {{ film.original_title }}</li>
            <li class="language">Lingua originale: {{ film.original_language }}</li>
            <li class="rating">Voto: {{ Math.ceil((film.vote_average) / 2) }}</li>
            <hr>
      </ul>
      <h2>SERIES</h2>
      <ul v-for="(series, i) in store.allSeries" :key="i">
            <li class="title w-100">Titolo: {{ series.name }}</li>
            <li class="original-title">Titolo originale: {{ series.original_name }}</li>
            <li class="language">Lingua originale: {{ series.original_language }}</li>
            <li class="rating">Voto: {{ Math.ceil((series.vote_average) / 2) }}</li>
            <hr>
      </ul>
    </main>
  </div>
</template>

<style lang="scss">
@use 'assets/scss/main' as *;
// Import all of Bootstrap's CSS
@import "bootstrap/scss/bootstrap";
</style>
