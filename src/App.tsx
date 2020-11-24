import { useEffect, useState } from "react";
import { tokenize } from "./tokenize";
import { parse } from "./parse";
import { evaluate } from "./evaluate";
import { examples } from "./examples";

function App() {
  const [program, setProgram] = useState<string>();
  const [tokens, setTokens] = useState<{}[]>();
  const [ast, setAst] = useState<{}>();

  useEffect(() => {
    if (program === undefined) {
      return;
    }
    const tokens = tokenize(program);
    setTokens([...tokens]);
    const ast = parse(tokens);
    setAst(ast);
    evaluate(ast);
  }, [program]);

  return (
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
  );
}

export default App;
