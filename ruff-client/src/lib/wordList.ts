const WORDS_BY_LENGTH: Record<number, string[]> = {
  3: ['CAT', 'DOG', 'SUN', 'MAP', 'CAR', 'PEN'],
  4: ['TREE', 'GAME', 'LIVE', 'CODE', 'NOTE', 'PLAY'],
  5: ['APPLE', 'REACT', 'PLACE', 'GRAPE', 'TRAIN', 'CROWN'],
  6: ['PLANET', 'OBJECT', 'RANDOM', 'STRING', 'CASTLE', 'BRIDGE'],
  7: ['FICTION', 'CONTAIN', 'BATTERY', 'PICTURE'],
  8: ['DIVISION', 'COMPUTER', 'MAJORITY'],
};

export function pickRandomWord(len: number) {
  const arr = WORDS_BY_LENGTH[len] ?? WORDS_BY_LENGTH[5];
  return arr[Math.floor(Math.random() * arr.length)].toUpperCase();
}
