// CanvasComponent.tsx
import { watch } from "fs";
import React, { useRef, useEffect } from "react";

type Point = {
  x: number;
  y: number;
};

interface CanvasProps {
  points: Point[];
  bezierPoints: Point[];
  show: boolean;
}

const CanvasComponent: React.FC<CanvasProps> = ({
  points,
  bezierPoints,
  show,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate the minimum values as well
  let MinWidth = Infinity,
    MinHeight = Infinity;
  for (let i = 0; i < points.length; i++) {
    MinWidth = Math.min(points[i].x, MinWidth);
    MinHeight = Math.min(points[i].y, MinHeight);
  }

  for (let i = 0; i < bezierPoints.length; i++) {
    MinWidth = Math.min(bezierPoints[i].x, MinWidth);
    MinHeight = Math.min(bezierPoints[i].y, MinHeight);
  }

  let MaxWidth = 0,
    MaxHeight = 0;
  for (let i = 0; i < points.length; i++) {
    MaxWidth = Math.max(points[i].x, MaxWidth);
    MaxHeight = Math.max(points[i].y, MaxHeight);
  }

  for (let i = 0; i < bezierPoints.length; i++) {
    MaxWidth = Math.max(bezierPoints[i].x, MaxWidth);
    MaxHeight = Math.max(bezierPoints[i].y, MaxHeight);
  }
  const padding = 40;
  const paddedWidth = 400 - padding * 2;
  const paddedHeight = 400 - padding * 2;

  // Normalize to center the curve
  const Normalize = (num: number, which: "w" | "h") => {
    const range = which === "w" ? MaxWidth - MinWidth : MaxHeight - MinHeight;
    const scale = which === "w" ? paddedWidth : paddedHeight;
    return (
      padding + ((num - (which === "w" ? MinWidth : MinHeight)) / range) * scale
    );
  };

  const drawGrid = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const gridSize = Math.min(width / 10, height / 10);
    context.strokeStyle = "#cbd5e1";

    // Draw vertical grid lines
    for (let x = 0; x <= width; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= height; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  };

  const drawLine = (
    context: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    color: string = "black"
  ) => {
    context.beginPath();
    context.moveTo(Normalize(start.x, "w"), Normalize(start.y, "h"));
    context.lineTo(Normalize(end.x, "w"), Normalize(end.y, "h"));
    context.strokeStyle = color;
    context.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Clear the canvas
        context.clearRect(0, 0, 400, 400);

        // Draw the grid
        drawGrid(context, 400, 400);

        if (show) {
          // Draw the segments
          for (let i = 0; i < points.length - 1; i++) {
            drawLine(context, points[i], points[i + 1], "blue");
          }

          // Draw the bezier curve
          for (let i = 0; i < bezierPoints.length - 1; i++) {
            drawLine(context, bezierPoints[i], bezierPoints[i + 1], "red");
          }
        }
      }
    }
  }); // Redraw when points, bezierPoints, width, or height change

  return (
    <canvas ref={canvasRef} width={400} height={400} className="bg-zinc-100" />
  );
};

export default CanvasComponent;
