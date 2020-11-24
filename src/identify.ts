const LETTER = /[a-zA-Z]/;
const WHITESPACE = /\s+/;
const NUMBER = /^[0-9]+$/;
const SYMBOLS = [";"];

// Check for truthiness of character to avoid false-positives on `undefined`.
export const isLetter = (character: string) =>
  character && LETTER.test(character);

export const isMidWord = (character: string) =>
  isLetter(character) || isNumber(character) || character === ".";

export const isWhitespace = (character: string) => WHITESPACE.test(character);

export const isNumber = (character: string) => NUMBER.test(character);

export const isSymbol = (character: string) => SYMBOLS.includes(character);
