import { Point, Segment } from "../types";

function middlePoint(s: Segment): Point {
  const xp = (s.start.x + s.end.x) / 2;
  const yp = (s.start.y + s.end.y) / 2;
  return {
    x: xp,
    y: yp,
  };
}

// Nyoba dulu dengan iterasi ke 2
export function QuadraticBezierCurve(
  points: Point[],
  iteration: number
): Point[] {
  if (iteration === 1) {
    const middle1 = middlePoint({ start: points[0], end: points[1] });
    const middle2 = middlePoint({ start: points[1], end: points[2] });
    const middle = middlePoint({ start: middle1, end: middle2 });

    return [points[0], middle, points[2]];
  }

  const middle1 = middlePoint({ start: points[0], end: points[1] });
  const middle2 = middlePoint({ start: points[1], end: points[2] });
  const middle = middlePoint({ start: middle1, end: middle2 });

  const first = QuadraticBezierCurve(
    [points[0], middle1, middle],
    iteration - 1
  );
  const second = QuadraticBezierCurve(
    [middle, middle2, points[2]],
    iteration - 1
  );

  return [points[0], ...first, middle, ...second, points[2]];
}
