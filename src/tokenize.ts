import { Token } from "./types";

import {
  isWhitespace,
  isSymbol,
  isNumber,
  isLetter,
  isMidWord,
} from "./identify";

export const tokenize = (input: string): Token[] => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const character = input[cursor];

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isSymbol(character)) {
      tokens.push({
        type: "Symbol",
        value: character,
      });
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let number = character;

      while (isNumber(input[++cursor])) {
        number += input[cursor];
      }

      tokens.push({
        type: "NumericLiteral",
        value: parseInt(number, 10),
      });

      continue;
    }

    if (isLetter(character)) {
      let name = character;

      while (isMidWord(input[++cursor])) {
        name += input[cursor];
      }

      tokens.push({
        type: "Word",
        value: name,
      });

      continue;
    }

    throw new Error(`Invalid character: "${character}"`);
  }

  return tokens;
};
