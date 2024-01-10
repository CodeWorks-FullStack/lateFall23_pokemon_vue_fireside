<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 d-flex align-items-center">
        <h1>Pokemons</h1>
        <button :disabled="!previousPage" @click="changePage(previousPage)"
          class="btn btn-outline-dark ms-3">Previous</button>
        <button :disabled="!nextPage" @click="changePage(nextPage)" class="btn btn-outline-dark ms-3">Next</button>
      </div>
    </section>
    <section class="row">
      <div class="col-3 pokelist">
        <div v-for="pokemon in pokemons" class="mb-3">
          <button @click="getPokemonByUrl(pokemon.url)" class="btn btn-danger w-100">
            <i class="mdi mdi-pokeball"></i>
            {{ pokemon.name }}
          </button>
        </div>
      </div>
      <div class="col-9">
        <h2>Pokemon Details</h2>
        <div v-if="activePokemon">
          <h3>{{ activePokemon.name }}</h3>
          <img :src="activePokemon.imgUrl" :alt="'Picture of ' + activePokemon.name">
          <p>
            <span class="ms-3" v-for="ability in activePokemon.abilities">
              {{ ability }}
            </span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { pokemonsService } from '../services/PokemonsService.js'
import { AppState } from '../AppState.js'

export default {
  setup() {
    async function getPokemons() {
      try {
        await pokemonsService.getPokemons()
      } catch (error) {
        Pop.error(error)
      }
    }


    onMounted(() => {
      getPokemons()
    })
    return {
      pokemons: computed(() => AppState.pokemons),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      activePokemon: computed(() => AppState.activePokemon),

      async changePage(pageURL) {
        try {
          console.log('here is the page url!', pageURL);
          await pokemonsService.changePage(pageURL)
        } catch (error) {
          Pop.error(error)
        }
      },
      async getPokemonByUrl(pokemonURL) {
        try {
          await pokemonsService.getPokemonByUrl(pokemonURL)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pokelist {
  max-height: 82vh;
  overflow-y: auto;
}
</style>
