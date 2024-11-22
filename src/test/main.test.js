import { pokemonAvailableInVersion, filterMovesByVersion } from '../helper';

describe('pokemonAvailableInVersion', () => {
  const mockPokemonData = {
    game_indices: [
      { version: { name: 'heartgold' } },
      { version: { name: 'soulsilver' } },
      { version: { name: 'platinum' } }
    ]
  };

  test('returns true for single version match', () => {
    expect(pokemonAvailableInVersion(mockPokemonData, 'platinum')).toBe(true);
  });

  test('returns true for first game in hyphenated version', () => {
    expect(pokemonAvailableInVersion(mockPokemonData, 'heartgold-soulsilver')).toBe(true);
  });

  test('returns true for second game in hyphenated version', () => {
    expect(pokemonAvailableInVersion(mockPokemonData, 'soulsilver-heartgold')).toBe(true);
  });

  test('returns false for non-matching single version', () => {
    expect(pokemonAvailableInVersion(mockPokemonData, 'diamond')).toBe(false);
  });

  test('returns false for non-matching hyphenated version', () => {
    expect(pokemonAvailableInVersion(mockPokemonData, 'ruby-sapphire')).toBe(false);
  });
});

describe('filterMovesByVersion', () => {
  const mockPokemonData = {
    moves: [
      {
        move: { name: 'explosion' },
        version_group_details: [
          { 
            version_group: { name: 'heartgold-soulsilver' }, 
            move_learn_method: { name: 'level-up' },
            level_learned_at: 1 
          }
        ]
      },
      {
        move: { name: 'icy-wind' },
        version_group_details: [
          { 
            version_group: { name: 'heartgold-soulsilver' }, 
            move_learn_method: { name: 'level-up' },
            level_learned_at: 9 
          }
        ]
      },
      {
        move: { name: 'tackle' },
        version_group_details: [
          { 
            version_group: { name: 'heartgold-soulsilver' }, 
            move_learn_method: { name: 'machine' },
            level_learned_at: 0 
          }
        ]
      }
    ]
  };

  test('filters moves learned in version by level up by default', () => {
    const result = filterMovesByVersion(mockPokemonData, 'heartgold-soulsilver');
    expect(result).toEqual([
      { name: 'explosion', level: 1 },
      { name: 'icy-wind', level: 9 }
    ]);
  });
  test('returns empty array for non-matching version', () => {
    const result = filterMovesByVersion(mockPokemonData, 'platinum');
    expect(result).toEqual([]);
  });
});