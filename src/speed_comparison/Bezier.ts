import { Point, Segment } from "../src/types";
import { QuadraticBezierBruteForce } from "./BezierBruteForce";

// Calculate middle point of a segment
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

/**
 *
 * @param params contains the control points, msearch method, and number of iterations.
 * @see type QuadraticBezierCurveParams
 *
 * @returns Bezier Curve Points and the duration of execution time in milliseconds.
 */
export function QuadraticBezierCurve(params: QuadraticBezierCurveParams): {
  points: Point[];
  duration: number;
} {
  const { points, iteration, type } = params;

  let result;
  const startTime = performance.now();

  if (iteration === 0) {
    return {
      points,
      duration: performance.now() - startTime,
    };
  }

  if (type === "DnC") {
    result = QuadraticBezierDnC(points, iteration);
  } else {
    result = QuadraticBezierBruteForce(points, iteration);
  }

  const endTime = performance.now();

  return { points: result, duration: endTime - startTime };
}

/**
 *
 * @param points Control points
 * @param iteration number of iterations
 * @returns bezier curve points
 */
function QuadraticBezierDnC(points: Point[], iteration: number): Point[] {
  if (iteration === 0) {
    return points;
  }
  const middle1 = middlePoint({ start: points[0], end: points[1] });
  const middle2 = middlePoint({ start: points[1], end: points[2] });

  // get middle point between the two middle point.
  const middle = middlePoint({ start: middle1, end: middle2 });

  if (iteration <= 1) {
    return [points[0], middle, points[2]];
  }

  // divide and conquer
  let first = QuadraticBezierDnC([points[0], middle1, middle], iteration - 1);
  let second = QuadraticBezierDnC([middle, middle2, points[2]], iteration - 1);

  // join
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
  if (iteration === 0) return points;
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
