import { forward, back, left, right, penup, pendown } from "./draw";
import { CommandNode, Definition, RootNode, ArgumentNode } from "./types";
import { hasOwnProperty, Fn } from "./ts-helpers";

const constants: any = {
  PI: Math.PI,
};

const variables: { [name: string]: number } = {};

const nativeEffects: { [name: string]: Fn } = {
  forward,
  back,
  left,
  right,
  penup,
  pendown,
};

const customEffects: { [name: string]: Definition } = {};

let bindings: any = {};

const apply = ({ name, args }: CommandNode) => {
  if (!hasOwnProperty(nativeEffects, name)) {
    throw new Error(`${name} is not a function.`);
  }
  const fn = nativeEffects[name];
  fn(...args.map(evaluateArgument));
};

const applyCustom = (definition: any, args: any) => {
  if (args.length > definition.params.length) {
    throw new Error(`Too many arguments.`);
  }
  if (args.length < definition.params.length) {
    throw new Error(`Too few arguments.`);
  }
  bindings = {
    ...bindings,
    ...definition.params.reduce((acc: any, cur: any, i: number) => {
      acc[cur] = evaluateArgument(args[i]);
      return acc;
    }, {}),
  };
  definition.body.forEach(evaluateCommand);
  bindings = {};
};

const lookup = (node: ArgumentNode) => {
  const value =
    bindings[node.value] || constants[node.value] || variables[node.value];
  if (value === undefined) {
    throw new Error(`${node.value} is not defined.`);
  }
  return value;
};

const evaluateArgument = (node: ArgumentNode) => {
  if (node.type === "Identifier") {
    return lookup(node);
  }
  if (node.type === "NumericLiteral") {
    return node.value;
  }
  throw new Error(`Arguments must be numbers or variable names.`);
};

const evaluateCommand = (node: any) => {
  if (node.type === "CallExpression") {
    if (node.name in customEffects) {
      applyCustom(customEffects[node.name], node.args);
      return;
    }
    apply(node);
    return;
  }
  if (node.type === "Block") {
    if (node.name === "repeat") {
      evaluateRepeat(node);
    } else if (node.name === "define") {
      evaluateDefine(node);
    }
    return;
  }
  if (node.type === "Assignment") {
    evaluateSet(node);
    return;
  }
  throw new Error(
    `Commands must begin with a CallExpression or Block. Recieved "${node.type}".`
  );
};

const evaluateSet = (node: any) => {
  const [identifier, assignment] = node.args;
  variables[identifier.value] = evaluateArgument(assignment);
};

const evaluateRepeat = (node: any) => {
  const iterations = node.args[0].value;

  for (let i = 0; i < iterations; i++) {
    node.body.forEach(evaluateCommand);
  }
};

const evaluateDefine = (node: any) => {
  const [name, ...params] = node.args.map((node: any) => node.value);
  customEffects[name] = {
    name,
    params,
    body: node.body,
  };
};

export const evaluate = (ast: RootNode) => {
  ast.body.forEach(evaluateCommand);
};
