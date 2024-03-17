import { QuadraticBezierCurve } from "./Bezier";

function main() {
  // Dilakukan untuk melihat perbedaan speed antara bruteforce dengan dnc
  // dilakukan diluar web browser menghindari terjadinya caching.
  const points = [
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
  ];

  let time = performance.now();
  for (let i = 0; i < 1; i++) {
    console.log(QuadraticBezierCurve({ points, iteration: 3, type: "DnC" }));
  }
  console.log("DnC:", performance.now() - time, " milliseconds");
  time = performance.now();
  for (let i = 0; i < 1; i++) {
    console.log(
      QuadraticBezierCurve({
        points,
        iteration: 3,
        type: "Bruteforce",
      })
    );
  }
  console.log("Bruteforce:", performance.now() - time, " milliseconds");
}

main();
