import React, { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

function App() {
  const [screenRectangle, setScreenRectangle] = useState<DOMRect>();

  useEffect(() => {
    setScreenRectangle(document.body.getBoundingClientRect());
  }, []);

  if (!screenRectangle) {
    return null;
  }

  return (
    <>
      <Canvas
        height={screenRectangle.height}
        width={screenRectangle.width}
        draw={(ctx) => {
          ctx.strokeStyle = "green";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(50, 100);
          ctx.lineTo(500, 500);
          ctx.stroke();
        }}
      />
      <Canvas
        height={screenRectangle.height}
        width={screenRectangle.width}
        draw={(ctx) => {
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(50, 50);
          ctx.lineTo(500, 600);
          ctx.stroke();
        }}
      />
    </>
  );
}

export default App;
