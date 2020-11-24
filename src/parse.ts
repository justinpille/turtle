import { Token, ArgumentNode, CommandNode, BlockNode, RootNode } from "./types";

export const parse = (tokens: Token[]): RootNode => {
  return {
    type: "Root",
    body: parseCommands(tokens),
  };
};

export const parseCommands = (tokens: Token[]): (CommandNode | BlockNode)[] => {
  const token = tokens.shift();
  if (token === undefined) {
    return [];
  }

  const { value } = token;

  if (typeof value !== "string") {
    throw new Error(
      `Commands should begin with a string, recived a ${typeof value} with value ${value}`
    );
  }

  if (value === "end") {
    return [];
  }
  if (value === ";") {
    return parseCommands(tokens);
  }
  let node: CommandNode | BlockNode;

  if (isBlockCommand(value)) {
    node = {
      type: "Block",
      name: value,
      args: parseArguments(tokens),
      body: parseCommands(tokens),
    };
  } else if (isAssignmentCommand(value)) {
    node = {
      type: "Assignment",
      name: value,
      args: parseArguments(tokens),
    };
  } else {
    node = {
      type: "CallExpression",
      name: value,
      args: parseArguments(tokens),
    };
  }

  return [node, ...parseCommands(tokens)];
};

const isAssignmentCommand = (value: string | number): boolean => {
  return value === "set";
};

const isBlockCommand = (value: string | number): boolean => {
  return value === "repeat" || value === "define";
};

const parseArguments = (tokens: Token[]): ArgumentNode[] => {
  const token = tokens.shift();
  if (token === undefined) {
    return [];
  }
  if (token.value === ";") {
    return [];
  }
  const node: ArgumentNode = token;
  if (token.type === "Word") {
    node.type = "Identifier";
  }

  return [token, ...parseArguments(tokens)];
};
