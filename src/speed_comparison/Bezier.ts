import { Point, Segment } from "../src/types";
import { QuadraticBezierBruteForce } from "./BezierBruteForce";

function middlePoint(s: Segment): Point {
  const xp = (s.start.x + s.end.x) / 2;
  const yp = (s.start.y + s.end.y) / 2;
  return {
    x: xp,
    y: yp,
  };
}

type QuadraticBezierCurveParams = {
  points: Point[];
  iteration: number;
} & (
  | {
      type: "DnC";
    }
  | {
      type: "Bruteforce";
    }
);

export function QuadraticBezierCurve(params: QuadraticBezierCurveParams): {
  points: Point[];
  duration: number;
} {
  const { points, iteration, type } = params;
  let result;
  const startTime = performance.now();

  if (type === "DnC") {
    result = QuadraticBezierDnC(points, iteration);
  } else {
    result = QuadraticBezierBruteForce(points, iteration);
  }

  const endTime = performance.now();

  return { points: result, duration: endTime - startTime };
}
function QuadraticBezierDnC(points: Point[], iteration: number): Point[] {
  const middle1 = middlePoint({ start: points[0], end: points[1] });
  const middle2 = middlePoint({ start: points[1], end: points[2] });
  const middle = middlePoint({ start: middle1, end: middle2 });

  if (iteration <= 1) {
    return [points[0], middle, points[2]];
  }

  let first = QuadraticBezierDnC([points[0], middle1, middle], iteration - 1);
  let second = QuadraticBezierDnC([middle, middle2, points[2]], iteration - 1);

  return [...first, ...second.slice(1)];
}

export function DnCBezierCurve(points: Point[], iteration: number) {
  const startTime = performance.now();

  const result = BezierCurve(points, iteration);
  const endTime = performance.now();
  return {
    points: result,
    duration: endTime - startTime,
  };
}

export function BezierCurve(points: Point[], iteration: number): Point[] {
  const degree = points.length;
  let middles: Point[][] = [];

  for (let i = 0; i < degree; i++) {
    middles.push([]);
    middles[0].push(points[i]);
  }

  for (let i = 1; i < degree; i++) {
    for (let j = 0; j < degree - i; j++) {
      middles[i].push(
        middlePoint({
          start: middles[i - 1][j],
          end: middles[i - 1][j + 1],
        })
      );
    }
  }

  let first: Point[] = [],
    second: Point[] = [];

  for (let i = 0; i < degree; i++) {
    first.push(middles[i][0]);
  }

  for (let i = degree - 1; i >= 0; i--) {
    second.push(middles[i].at(-1) as Point);
  }

  if (iteration === 1) {
    let result: Point[] = [];
    for (let i = 0; i < degree; i += 2) {
      result.push(middles[i][0]);
    }

    if (degree & 1) result = result.slice(0, -1);

    let another: Point[] = [];
    for (let i = 0; i < degree; i += 2) {
      another.push(middles[i].at(-1) as Point);
    }
    another.reverse();

    return [points[0], middles[degree - 1][0], points[degree - 1]];
  } else {
    return BezierCurve(first, iteration - 1).concat(
      BezierCurve(second, iteration - 1).slice(1)
    );
  }
}
