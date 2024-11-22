import './styles.css';
import { pokemonAvailableInVersion } from './helper';
import Pokedex from 'pokedex-promise-v2';
const pokedex = new Pokedex();

/*Choose game
  Search pokemon
  If pokemon exists in that game 
    Show moves for that pokemon in that game
*/

let version = 'heartgold-soulsilver'

// Returns true if a pokemon is found in any given version
// function pokemonAvailableInVersion(pokemonData, version) {
//   const games = version.includes('-') ? version.split('-') : [version];
//   return games.some(game => 
//     pokemonData.game_indices.some(x => x.version.name === game)
//   );
// }


pokedex.getPokemonByName('suicune')
.then((response) => {
  console.log(response);
  console.log(pokemonAvailableInVersion(response, version));
})
.catch((error) => {
  console.log('There was an ERROR: ', error);
});