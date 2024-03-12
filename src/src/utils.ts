import { Point } from "./types";

export function randomPoint(): Point {
  const range = 100;
  return {
    x: Math.random() * range,
    y: Math.random() * range,
  };
}
