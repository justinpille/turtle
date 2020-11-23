import React, { FC, useEffect, useRef } from "react";

interface Props {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export const Canvas: FC<Props> = ({ height, width, draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      draw(ctx);
    }
  }, [draw]);

  return <canvas height={height} width={width} ref={canvasRef} />;
};
