type Point = {
  x: number;
  y: number;
};

const points: Point[] = [
  { x: 99.73305559691958, y: 39.97809224484921 },
  { x: 39.949381521051905, y: 22.82716385667554 },
  { x: 1.0915915041554536, y: 28.88962437992102 },
];

function scalePoint(point: Point): Point {
  // Adjust scaling factor based on your canvas size and the expected range of x and y values
  const scaleX = 5;
  const scaleY = 5;
  return {
    x: point.x * scaleX,
    y: 500 - point.y * scaleY, // 500 is the canvas height; this inverts the y-axis to match the 2D Cartesian system
  };
}

function drawLine(
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point
): void {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
}

function draw() {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const scaledPoint1 = scalePoint(points[0]);
      const scaledPoint2 = scalePoint(points[1]);
      const scaledPoint3 = scalePoint(points[2]);

      drawLine(ctx, scaledPoint1, scaledPoint2);
      drawLine(ctx, scaledPoint2, scaledPoint3);
    }
  }
}

draw();
