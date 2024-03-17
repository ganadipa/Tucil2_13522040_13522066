import { fail } from "assert";
import { Point, Segment } from "../src/types";
import { QuadraticBezierCurve, QuadraticBezierDnC } from "./Bezier";
import { QuadraticBezierBruteForce } from "./BezierBruteForce";

function isEqual(p1: Point[], p2: Point[]) {
  if (p1.length !== p2.length) {
    return false;
  }

  for (let i = 0; i < p1.length; i++) {
    if (p1[i].x !== p2[i].x || p1[i].y !== p2[i].y) return false;
  }
  return true;
}

function parseAndExecuteBezier(input: string) {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const [numPoints, iterations] = lines[0].split(" ").map(Number);
  if (numPoints !== lines.length - 1) {
    throw new Error(
      "The number of points does not match the expected count based on the input."
    );
  }

  const points: Point[] = lines.slice(1).map((line) => {
    const [x, y] = line.split(" ").map(Number);
    return { x, y };
  });

  if (points.length !== 3) {
    throw new Error("Quadratic Bezier requires exactly 3 points.");
  }

  const resultBF = QuadraticBezierCurve({
    points,
    iteration: iterations,
    type: "Bruteforce",
  });
  const resultDnC = QuadraticBezierCurve({
    points,
    iteration: iterations,
    type: "DnC",
  });
  if (!isEqual(resultBF.points, resultDnC.points)) {
    console.log(resultBF);
    console.log(resultDnC);
    console.log(input);
    throw new Error("Failed.");
  } else return { dnc: resultDnC.duration, bf: resultBF.duration };
}

function rng(): string {
  const it = Math.floor(Math.random() * 20);
  let ret = `3 ${it}`;
  for (let i = 0; i < 3; i++) {
    ret += `\n${Math.floor(Math.random() * 100)} ${Math.floor(
      Math.random() * 100
    )}`;
  }
  return ret;
}

for (let i = 1; i <= 100; i++) {
  try {
    const { dnc, bf } = parseAndExecuteBezier(rng());
    console.log(`${i}: PASSED!`);
    console.log(
      `DnC: ${Number(dnc).toFixed(2)} ms, BF: ${Number(bf).toFixed(2)} ms`
    );
  } catch {
    console.log(`${i}: FAILED!`);
  }
}
