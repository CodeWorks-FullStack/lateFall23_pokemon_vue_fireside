import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { logger } from "../utils/Logger.js"
import { pokeApi } from "./AxiosService.js"

class PokemonsService {
  async getPokemons() {
    const response = await pokeApi.get('pokemon')
    logger.log('GOT POKEMONS', response.data)
    AppState.pokemons = response.data.results
    AppState.nextPage = response.data.next
    AppState.previousPage = response.data.previous
  }

  async changePage(pageURL) {
    const response = await pokeApi.get(pageURL) // NOTE if you pass an enitre URL to axios as the first argument, it will ignore the baseURL and use the supplied URL instead
    logger.log('GOT A DIFFERENT PAGE OF POKEMONS', response.data)
    AppState.pokemons = response.data.results
    AppState.nextPage = response.data.next
    AppState.previousPage = response.data.previous
  }

  async getPokemonByUrl(pokemonURL) {
    const response = await pokeApi.get(pokemonURL) // NOTE if you pass an enitre URL to axios as the first argument, it will ignore the baseURL and use the supplied URL instead
    logger.log('GOT A POKEMON BY URL', response.data)
    AppState.activePokemon = new Pokemon(response.data)
  }
}

export const pokemonsService = new PokemonsService()