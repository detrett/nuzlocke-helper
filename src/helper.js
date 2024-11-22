export function pokemonAvailableInVersion(pokemonData, version) {
  const games = version.includes('-') ? version.split('-') : [version];
  return games.some((game) =>
    pokemonData.game_indices.some((x) => x.version.name === game)
  );
}

export function filterMovesByVersion(pokemonData, version) {
  return pokemonData.moves
    .filter((move) => {
      const versionCheck = isLearnedInVersion(move, version);
      const levelUpCheck = isLearnedByLevelUp(move);

      return versionCheck && levelUpCheck;
    })
    .map((move) => {
      const versionDetail = move.version_group_details.find((detail) => {
        return detail.version_group.name === version;
      });

      return {
        name: move.move.name,
        level: versionDetail.level_learned_at,
      };
    });
}

function isLearnedInVersion(moveData, version) {
  return moveData.version_group_details.some((detail) => {
    return detail.version_group.name === version;
  });
}

function isLearnedByLevelUp(moveData) {
  return moveData.version_group_details.some((detail) => {
    return detail.move_learn_method.name === 'level-up';
  });
}
