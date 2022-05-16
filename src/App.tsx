import { useEffect, useState } from "react";
import { tokenize } from "./tokenize";
import { parse, isBlockCommand } from "./parse";
import { evaluate } from "./evaluate";
import { examples } from "./examples";
import { clear } from "./draw";
import { pack } from "./pack";

const debugMode = false;

function App() {
  const [program, setProgram] = useState<string>();
  const [tokens, setTokens] = useState<{}[]>();
  const [ast, setAst] = useState<{}>();
  const [inputMode, setInputMode] = useState<"command" | "block">("command");

  const run = (command: string) => {
    setProgram((program) => {
      if (program === undefined) {
        return command;
      }
      return program + "\n" + command;
    });
  };

  const commandHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const commandBar = e.target as HTMLTextAreaElement;
      const command = commandBar.value.trim();
      const [name] = command.split(" ");

      if (isBlockCommand(name)) {
        commandBar.rows = 2;
        commandBar.value += "\n  ";
        setInputMode("block");
        return;
      }

      run(command);
      commandBar.value = "";
    }
  };

  const blockHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const commandBar = e.target as HTMLTextAreaElement;
      const command = commandBar.value;
      const lines = command.split("\n").map((line) => line.trim());

      if (commandBar.selectionEnd === command.length) {
        e.preventDefault();

        if (lines[lines.length - 1] === "end") {
          run(command);
          commandBar.value = "";
          commandBar.rows = 1;
          setInputMode("command");
          return;
        }

        commandBar.value += "\n  ";
        commandBar.rows += 1;
      }
    }
  };

  useEffect(() => {
    clear();
    if (program === undefined) {
      return;
    }
    const tokens = tokenize(pack(program));
    setTokens([...tokens]);
    const ast = parse(tokens);
    setAst(ast);
    evaluate(ast);
  }, [program]);

  return (
    <>
      {debugMode && (
        <>
          <h2>Examples</h2>
          {examples.map((ex, i) => (
            <button key={ex.name + i} onClick={() => setProgram(ex.program)}>
              {ex.name}
            </button>
          ))}
          <h2>Program</h2>
          <pre>{program}</pre>
          <h2>Tokens</h2>
          <pre>{JSON.stringify(tokens, null, 2)}</pre>
          <h2>AST</h2>
          <pre>{JSON.stringify(ast, null, 2)}</pre>
        </>
      )}
      <textarea
        onKeyDown={inputMode === "block" ? blockHandler : commandHandler}
        wrap="off"
        rows={1}
        cols={40}
        id="command-bar"
      ></textarea>
    </>
  );
}

export default App;
