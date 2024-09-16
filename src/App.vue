<script>
/* 
  Per importare ed utilizzare un componente dentro un altro devo SEMPRE seguire questi 3 passi:
  1) Importazione del componente
  2) Dichiarazione del componente
  3) Utilizzo del componente
*/
// 1) Importazione del componente
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
        store.allFilms.push(res.data.results)
        console.log('allFilms:', store.allFilms)
        // this.arrayClear()
      })
    },
    arrayClear(){
      store.allFilms = []
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
        
        <div class="single-film w-100" v-for="(film, index) in store.allFilms" :key="index">
          <div v-for="(singleFilm, i) in film" :key="i">
            <div class="title w-100">{{ singleFilm.title }}</div>
            <div class="original-title">{{ singleFilm.original_title }}</div>
            <div class="language">{{ singleFilm.original_language }}</div>
            <div class="rating">{{ Math.ceil((singleFilm.vote_average) / 2) }}</div>
          </div>
        </div>
      </form>
      
    </main>
  </div>
</template>

<style lang="scss">
@use 'assets/scss/main' as *;
// Import all of Bootstrap's CSS
@import "bootstrap/scss/bootstrap";
</style>
