import { tokenize } from "./tokenize";
import { pack } from "./pack";

it("works", () => {
  expect(tokenize(pack(code))).toEqual(tokens);
});

const code = `
  back 50
  repeat 100
    forward 200
    left 179
  end
  define rectangle side1 side2
    forward side1
    right 90
    forward side2
    right 90
    forward side1
    right 90
    forward side2
    right 90
  end
  rectangle 200 300
  define square
    repeat 4
      forward square.size
      right 90
    end
  end
  set square.size 400
  square
`;

const tokens = [
  { type: "Word", value: "back" },
  { type: "NumericLiteral", value: 50 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "repeat" },
  { type: "NumericLiteral", value: 100 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "forward" },
  { type: "NumericLiteral", value: 200 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "left" },
  { type: "NumericLiteral", value: 179 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "end" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "define" },
  { type: "Word", value: "rectangle" },
  { type: "Word", value: "side1" },
  { type: "Word", value: "side2" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "forward" },
  { type: "Word", value: "side1" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "right" },
  { type: "NumericLiteral", value: 90 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "forward" },
  { type: "Word", value: "side2" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "right" },
  { type: "NumericLiteral", value: 90 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "forward" },
  { type: "Word", value: "side1" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "right" },
  { type: "NumericLiteral", value: 90 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "forward" },
  { type: "Word", value: "side2" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "right" },
  { type: "NumericLiteral", value: 90 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "end" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "rectangle" },
  { type: "NumericLiteral", value: 200 },
  { type: "NumericLiteral", value: 300 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "define" },
  { type: "Word", value: "square" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "repeat" },
  { type: "NumericLiteral", value: 4 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "forward" },
  { type: "Word", value: "square.size" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "right" },
  { type: "NumericLiteral", value: 90 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "end" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "end" },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "set" },
  { type: "Word", value: "square.size" },
  { type: "NumericLiteral", value: 400 },
  { type: "Symbol", value: ";" },
  { type: "Word", value: "square" },
];
