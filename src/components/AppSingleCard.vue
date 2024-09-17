<script>
import {store} from '../store.js';
export default {
  data() {
    return { 
      store
    }
  },
  props:{
    poster: String,
    title: String,
    OGtitle: String,
    language: String,
    rating: Number,
    overview: String,
  },
  methods:{
    // stampa per le bandiere
    flagPrinter(lang){
      const flags = {
        en: 'GB',
        it: 'IT',
        ja: 'JP',
        fr: 'FR',
      }
      if(lang in flags){
        return 'https://flagsapi.com/' + flags[lang] + '/flat/32.png';
      }
      else{
        return 'https://www.novalibandiere.it/wp-content/uploads/jolly-roger_rackham.jpg';
      }
    },
  }
}
</script>

<template>
  <div class="col-3">
    <div class="card mb-4">
      <div class="card-body p-0 ">
          <div class="front ">
            <img v-if="poster != null" class="poster" :src="store.posterPath + poster">
            <p v-else><strong>COPERTINA NON DISPONIBILE</strong></p>
          </div>
          <div class="back overflow-auto d-flex w-100 align-items-center flex-wrap p-2">
            <h5 class="card-title w-100 my-3">Titolo: {{ title }}</h5>
            <p class="card-text w-100">
              Titolo originale: {{ OGtitle }}
            </p>
            <p class="card-text w-100">
              Lingua originale: <img class="flags" :src="flagPrinter(language)">
            </p>
            <p class="card-text w-100 p-1">
              Voto: 
                <template v-for="n in Math.ceil((rating) / 2)">
                  <i class="fa-solid fa-star"></i>
                </template>
                <template v-for="n in (5 - Math.ceil((rating) / 2))">
                  <i class="fa-regular fa-star"></i>
                </template>  
            </p>
            <p class="card-text w-100">
              {{ overview }}
            </p>
          </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;
.card:hover .card-body{
  transform:rotateY(-180deg)
}
.card{
  height:460px;
  min-width:305px;
  background: linear-gradient(140deg, rgba(26,33,67,1) 24%, rgba(33,14,23,1) 88%);
  color:white;
  border-radius:20px;
  position:relative;
  .card-body{
    position:absolute;
    width:100%;
    height:100%;
    transition:transform 1s;
    transform-style: preserve-3d;
    .front{
      .poster{
        border-radius:20px;
        width:100%;
        height:100%; 
        object-fit: cover;
      }
    }
  }
}
.front, .back{
  position:absolute;
  width:100%;
  height:100%;
  backface-visibility: hidden;
}
.back{
  transform:rotateY(180deg);
  scrollbar-width:none;
}
.flags{
  width:32px;
  border-radius:5px;
}

</style>

<!--  -->
