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

  let MinWidth = Infinity,
    MinHeight = Infinity,
    MaxWidth = 0,
    MaxHeight = 0;

  [...points, ...bezierPoints].forEach((point) => {
    MinWidth = Math.min(point.x, MinWidth);
    MinHeight = Math.min(point.y, MinHeight);
    MaxWidth = Math.max(point.x, MaxWidth);
    MaxHeight = Math.max(point.y, MaxHeight);
  });

  const padding = 40;
  const canvasSize = 400;
  const paddedWidth = canvasSize - padding * 2;
  const paddedHeight = canvasSize - padding * 2;

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

    for (let x = 0; x <= width; x += gridSize) {
      context.beginPath();
      context.moveTo(x + padding, padding);
      context.lineTo(x + padding, height + padding);
      context.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      context.beginPath();
      context.moveTo(padding, y + padding);
      context.lineTo(width + padding, y + padding);
      context.stroke();
    }
  };

  const drawAxes = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.moveTo(canvasSize - padding / 2, canvasSize - padding);
    context.lineTo(padding, canvasSize - padding);
    context.lineTo(padding, padding / 2);
    context.strokeStyle = "black";
    context.stroke();

    const gridSize = Math.min(paddedWidth / 10, paddedHeight / 10);

    for (let i = 0; i <= 10; i++) {
      const xLabel = ((MaxWidth - MinWidth) / 10) * i + MinWidth;
      const yLabel = ((MaxHeight - MinHeight) / 10) * i + MinHeight;

      // X-axis labels
      context.fillText(
        xLabel.toFixed(2),
        padding + i * gridSize - 10,
        canvasSize - padding + 15
      );

      context.fillText(yLabel.toFixed(2), 0, padding + i * gridSize);
    }
  };

  const drawPointLabel = (
    context: CanvasRenderingContext2D,
    point: Point,
    label: string
  ) => {
    let more = 0;
    if (label.slice(0, 1) === "P") more = 5;
    const labelX = Normalize(point.x, "w");
    const labelY = Normalize(point.y, "h");

    context.fillStyle = "black";
    context.fillText(label, labelX + 5 - 3 * more, labelY - 5);
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
        context.clearRect(0, 0, canvasSize, canvasSize);
        context.font = "bold 8px Arial";

        drawGrid(context, paddedWidth, paddedHeight);
        drawAxes(context);

        if (show) {
          for (let i = 0; i < points.length - 1; i++) {
            drawLine(context, points[i], points[i + 1], "blue");
          }
          for (let i = 0; i < bezierPoints.length - 1; i++) {
            drawLine(context, bezierPoints[i], bezierPoints[i + 1], "red");
          }

          // Draw the bezier points
          bezierPoints.forEach((point, index) => {
            const normalizedX = Normalize(point.x, "w");
            const normalizedY = Normalize(point.y, "h");

            // Draw a black point
            context.fillStyle = "black";
            context.beginPath();
            context.arc(normalizedX, normalizedY, 1, 0, Math.PI * 2, true);
            context.fill();

            // Label the point
            if (index >= 15) index += 1;
            const label =
              String.fromCharCode(65 + (index % 26)) + Math.floor(index / 26);
            drawPointLabel(context, point, label);
          });

          points.forEach((point, index) => {
            const normalizedX = Normalize(point.x, "w");
            const normalizedY = Normalize(point.y, "h");

            // Draw a black point
            context.fillStyle = "black";
            context.beginPath();
            context.arc(normalizedX, normalizedY, 1, 0, Math.PI * 2, true);
            context.fill();

            // Label the point
            const label = "P" + index;
            drawPointLabel(context, point, label);
          });
        }
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="bg-zinc-100"
    />
  );
};

export default CanvasComponent;
