import { pokemonAvailableInVersion } from '../helper';

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