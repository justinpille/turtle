export type Token = {
  type: string;
  value: string | number;
};

export type ArgumentNode = {
  type: string;
  value: string | number;
};

export type CommandNode = {
  type: string;
  name: string;
  args: ArgumentNode[];
};

export type BlockNode = {
  type: "Block";
  name: string;
  args: ArgumentNode[];
  body: CommandNode[] | BlockNode[];
};

export type RootNode = {
  type: "Root";
  body: CommandNode[];
};

export type Definition = {
  name: string;
  params: string[];
  body: (CommandNode | BlockNode)[];
};
