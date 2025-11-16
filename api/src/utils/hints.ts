export function generateHint(word: string) {
  const vowels = word.match(/[aeiou]/g)?.length || 0;
  const consonants = word.length - vowels;
  const startsWithVowel = /^[aeiou]/.test(word);
  const rareLetters = /[jqxz]/.test(word);

  const hints: string[] = [];

  hints.push(
    `This word has **${vowels} vowel${vowels !== 1 ? 's' : ''}** and **${consonants} consonant${consonants !== 1 ? 's' : ''}**.`
  );

  if (startsWithVowel) {
    hints.push(`The word starts with a **vowel**.`);
  } else {
    hints.push(`The word starts with a **consonant**.`);
  }

  if (rareLetters) {
    hints.push(`This word contains a **rare English letter**.`);
  } else {
    hints.push(`This word uses only **common letters**.`);
  }

  return hints[0];
}
