export function pokemonAvailableInVersion(pokemonData, version) {
  const games = version.includes('-') ? version.split('-') : [version];
  return games.some(game => 
    pokemonData.game_indices.some(x => x.version.name === game)
  );
}