import './styles.css';
import { pokemonAvailableInVersion, filterMovesByVersion } from './helper';
import Pokedex from 'pokedex-promise-v2';
const pokedex = new Pokedex();

/*Choose game
  Search pokemon
  If pokemon exists in that game 
    Show moves for that pokemon in that game
*/

let version = 'heartgold-soulsilver'

pokedex.getPokemonByName('regice')
.then((response) => {
  console.log(response);
  if(pokemonAvailableInVersion(response, version)) {
    const filteredMoves = filterMovesByVersion(response, version);
    console.log(filteredMoves);
  };
})
.catch((error) => {
  console.log('There was an ERROR: ', error);
});