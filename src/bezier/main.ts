import { Point, Segment } from "../src/types";

let point_used = 0;
let point_calculated = 0;

function middlePoint(s: Segment): Point {
  const xp = (s.start.x + s.end.x) / 2;
  const yp = (s.start.y + s.end.y) / 2;
  return {
    x: xp,
    y: yp,
  };
}

function BezierCurve(points: Point[], iteration: number): Point[] {
  if (iteration === 0) return points;
  const degree = points.length;
  let middles: Point[][] = [];

  for (let i = 0; i < degree; i++) {
    middles.push([]);
    middles[0].push(points[i]);
    point_calculated++;
  }

  for (let i = 1; i < degree; i++) {
    for (let j = 0; j < degree - i; j++) {
      middles[i].push(
        middlePoint({
          start: middles[i - 1][j],
          end: middles[i - 1][j + 1],
        })
      );
      point_calculated++;
    }
  }

  // divide
  let first: Point[] = [],
    second: Point[] = [];

  for (let i = 0; i < degree; i++) {
    first.push(middles[i][0]);
  }

  for (let i = degree - 1; i >= 0; i--) {
    second.push(middles[i].at(-1) as Point);
  }

  if (iteration === 1) {
    return [points[0], middles[degree - 1][0], points[degree - 1]];
  } else {
    // conquer and join
    return BezierCurve(first, iteration - 1).concat(
      BezierCurve(second, iteration - 1).slice(1)
    );
  }
}

const start_time = performance.now();
BezierCurve(
  [
    {
      x: 0,
      y: 0,
    },
    {
      x: 15,
      y: 15,
    },
    {
      x: 20,
      y: 10,
    },
    {
      x: 25,
      y: 40,
    },
  ],
  20
);
const mid_time = performance.now();
console.log(mid_time - start_time);
console.log(point_calculated);
point_calculated = 0;
BezierCurve(
  [
    {
      x: 0,
      y: 0,
    },
    {
      x: 15,
      y: 15,
    },
    {
      x: 20,
      y: 10,
    },
    {
      x: 55,
      y: 10,
    },
    {
      x: 25,
      y: 15,
    },
    {
      x: 0,
      y: 10,
    },
    {
      x: 15,
      y: 25,
    },
    {
      x: 35,
      y: 10,
    },
  ],
  20
);
console.log(performance.now() - mid_time);
console.log(point_calculated);
point_calculated = 0;
