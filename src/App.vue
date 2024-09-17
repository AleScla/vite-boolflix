<script>

import {store} from './store.js';
import AppHeader from './components/AppHeader.vue';
import AppSingleCard from './components/AppSingleCard.vue';
import axios from 'axios';


export default {
  data() {
    return { 
      store
    }
  },
  // 2) Dichiarazione del componente
  components: {
    AppHeader,
    AppSingleCard,
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
  }
}
</script>

<template>
  <div>
    <!-- 3) Utilizzo del componente -->
    <AppHeader />
    
    <main class="w-100">
      <div class="container">
        <form class="w-100 py-5 search-form d-flex justify-content-center" @submit.prevent="StartAPI()">
          <div class="form-floating text-center w-75">
            <input type="text" v-model="this.store.inputValue" class="form-control" id="floatingInput" placeholder="Che film o serie cerchi?">
            <label for="floatingInput">Che film cerchi?</label>
          </div>
          <button type="submit" class="ms-2 btn btn-danger "><strong>Cerca</strong></button>
        </form>
      </div>
      <div class="container">
        <h2 class="text-start text-white text-bold">FILMS</h2>
        <div class="row">
          <AppSingleCard v-for="film, index in store.allFilms" 
          :key="index"
          :poster="film.poster_path" 
          :title="film.title" 
          :OGtitle="film.original_title"
          :rating="film.vote_average"
          :language="film.original_language"
          :overview="film.overview"
          />
        </div>
      </div>
      <div class="container">
        <h2 class="text-start text-white text-bold">SERIE TV</h2>
        <div class="row">
          <AppSingleCard v-for="series, index in store.allSeries" 
          :key="index"
          :poster="series.poster_path" 
          :title="series.title" 
          :OGtitle="series.original_title"
          :rating="series.vote_average"
          :language="series.original_language"
          :overview="series.overview"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@use 'assets/scss/main' as *;
// Import all of Bootstrap's CSS
@import "bootstrap/scss/bootstrap";
main{
  background-color:#000000;
  min-height:100vh;
}
</style>
