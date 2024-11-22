import './styles.css';
import Pokedex from 'pokedex-promise-v2';
const pokedex = new Pokedex();

/*Choose game
  Search pokemon
  If pokemon exists in that game 
    Show moves for that pokemon in that game
*/

let version = 'heartgold-soulsilver'

// Returns true if a pokemon is found in any given version
function pokemonAvailableInVersion(pokemonData, version) {
  if(version.includes('-')) {
    const games = version.split('-');
    for (let game of games) {
      if(pokemonData.game_indices.some(x => x.version.name === game)) {
        return true;
      }
      return false;
    }
  }
  if(pokemonData.game_indices.some(x => x.version.name === version)) {
    return true;
  }
  return false;
}


pokedex.getPokemonByName('suicune')
.then((response) => {
  console.log(response);
  console.log(pokemonAvailableInVersion(response, version));
})
.catch((error) => {
  console.log('There was an ERROR: ', error);
});