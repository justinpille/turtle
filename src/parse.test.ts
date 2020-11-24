import { parse } from "./parse";

it("can handle nested loops", () => {
  const tokens = [
    { type: "Word", value: "repeat" },
    { type: "NumericLiteral", value: 3 },
    { type: "Symbol", value: ";" },

    { type: "Word", value: "repeat" },
    { type: "NumericLiteral", value: 4 },
    { type: "Symbol", value: ";" },

    { type: "Word", value: "forward" },
    { type: "NumericLiteral", value: 50 },
    { type: "Symbol", value: ";" },

    { type: "Word", value: "end" },
    { type: "Symbol", value: ";" },

    { type: "Word", value: "right" },
    { type: "NumericLiteral", value: 30 },
    { type: "Symbol", value: ";" },

    { type: "Word", value: "end" },
    { type: "Symbol", value: ";" },

    { type: "Word", value: "back" },
    { type: "NumericLiteral", value: 10 },
    { type: "Symbol", value: ";" },
  ];

  const ast = {
    type: "Root",
    body: [
      {
        type: "Block",
        name: "repeat",
        args: [{ type: "NumericLiteral", value: 3 }],
        body: [
          {
            type: "Block",
            name: "repeat",
            args: [{ type: "NumericLiteral", value: 4 }],
            body: [
              {
                args: [{ type: "NumericLiteral", value: 50 }],
                name: "forward",
                type: "CallExpression",
              },
            ],
          },
          {
            type: "CallExpression",
            name: "right",
            args: [{ type: "NumericLiteral", value: 30 }],
          },
        ],
      },
      {
        type: "CallExpression",
        name: "back",
        args: [{ type: "NumericLiteral", value: 10 }],
      },
    ],
  };

  expect(parse(tokens)).toEqual(ast);
});

it("works", () => {
  expect(parse(tokens)).toEqual(ast);
});

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

const ast = {
  type: "Root",
  body: [
    {
      type: "CallExpression",
      name: "back",
      args: [{ type: "NumericLiteral", value: 50 }],
    },
    {
      type: "Block",
      name: "repeat",
      args: [{ type: "NumericLiteral", value: 100 }],
      body: [
        {
          args: [{ type: "NumericLiteral", value: 200 }],
          name: "forward",
          type: "CallExpression",
        },
        {
          args: [{ type: "NumericLiteral", value: 179 }],
          name: "left",
          type: "CallExpression",
        },
      ],
    },
    {
      type: "Block",
      name: "define",
      args: [
        { type: "Identifier", value: "rectangle" },
        { type: "Identifier", value: "side1" },
        { type: "Identifier", value: "side2" },
      ],
      body: [
        {
          type: "CallExpression",
          name: "forward",
          args: [{ type: "Identifier", value: "side1" }],
        },
        {
          type: "CallExpression",
          name: "right",
          args: [{ type: "NumericLiteral", value: 90 }],
        },
        {
          type: "CallExpression",
          name: "forward",
          args: [{ type: "Identifier", value: "side2" }],
        },
        {
          type: "CallExpression",
          name: "right",
          args: [{ type: "NumericLiteral", value: 90 }],
        },
        {
          type: "CallExpression",
          name: "forward",
          args: [{ type: "Identifier", value: "side1" }],
        },
        {
          type: "CallExpression",
          name: "right",
          args: [{ type: "NumericLiteral", value: 90 }],
        },
        {
          type: "CallExpression",
          name: "forward",
          args: [{ type: "Identifier", value: "side2" }],
        },
        {
          type: "CallExpression",
          name: "right",
          args: [{ type: "NumericLiteral", value: 90 }],
        },
      ],
    },
    {
      type: "CallExpression",
      name: "rectangle",
      args: [
        { type: "NumericLiteral", value: 200 },
        { type: "NumericLiteral", value: 300 },
      ],
    },
    {
      type: "Block",
      name: "define",
      args: [{ type: "Identifier", value: "square" }],
      body: [
        {
          type: "Block",
          name: "repeat",
          args: [{ type: "NumericLiteral", value: 4 }],
          body: [
            {
              type: "CallExpression",
              name: "forward",
              args: [{ type: "Identifier", value: "square.size" }],
            },
            {
              type: "CallExpression",
              name: "right",
              args: [{ type: "NumericLiteral", value: 90 }],
            },
          ],
        },
      ],
    },
    {
      type: "Assignment",
      name: "set",
      args: [
        { type: "Identifier", value: "square.size" },
        { type: "NumericLiteral", value: 400 },
      ],
    },
    {
      type: "CallExpression",
      name: "square",
      args: [],
    },
  ],
};
