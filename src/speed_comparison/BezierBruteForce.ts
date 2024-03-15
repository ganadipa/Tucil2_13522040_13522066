import { Point, Segment } from "../src/types";

export function QuadraticBezierBruteForce(
  points: Point[],
  iteration: number
): Point[] {
  let numSteps: number = countNumSteps(3, iteration); //Menghitung banyaknya (titik) pada suatu iterasi
  const stepSize: number = 1.0 / (numSteps - 1); //Menghitung jarak antar titik pada suatu iterasi
  let returnArr: Point[] = [];
  returnArr.push(points[0]);
  for (let i = 1; i <= numSteps - 2; i++) {
    const t: number = stepSize * i;
    const xTemp: number =
      (1 - t) ** 2 * points[0].x +
      2 * (1 - t) * t * points[1].x +
      t ** 2 * points[2].x;
    const yTemp: number =
      (1 - t) ** 2 * points[0].y +
      2 * (1 - t) * t * points[1].y +
      t ** 2 * points[2].y;
    const pointTemp: Point = { x: xTemp, y: yTemp };
    returnArr.push(pointTemp);
  }
  returnArr.push(points[2]);
  return returnArr;
  //3
  //3 + 2
  //3 + 2 + 4
}

function NBezierBruteForce(
  points: Point[],
  iteration: number,
  nBezier: number //Quadratic = 2; Cubic = 3;
): Point[] {
  let numSteps: number = countNumSteps(3, iteration); //Menghitung banyaknya (titik) pada suatu iterasi
  const stepSize: number = 1.0 / (numSteps - 1); //Menghitung jarak antar titik pada suatu iterasi
  let pascalSeries: number[] = pascalTriangle(nBezier); //Mencari koefisien tiap suku pada rumus
  let returnArr: Point[] = [];

  returnArr.push(points[0]); //Menambahkan titik pertama

  for (let i = 1; i <= numSteps; i++) {
    //Mencari posisi titik selain titik awal dan akhir
    const t: number = stepSize * i;
    let xTemp: number = 0;
    let yTemp: number = 0;
    for (let j = 0; j <= nBezier; j++) {
      xTemp +=
        pascalSeries[j] * (1 - t) ** (nBezier - j) * t ** j * points[j].x;
      yTemp +=
        pascalSeries[j] * (1 - t) ** (nBezier - j) * t ** j * points[j].y;
    }
    const pointTemp: Point = { x: xTemp, y: yTemp };
    returnArr.push(pointTemp);
  }

  returnArr.push(points[nBezier - 1]); // Menambahkan titik terakhir
  return returnArr;
}
function countNumSteps(nBezier: number, iteration: number) {
  //Mencari berapa banyak titik pada iterasi ke-sekian
  let difference: number = nBezier - 1;
  let temp: number = nBezier;
  for (let i = 1; i < iteration; i++) {
    temp = temp + difference ** i;
  }
  return temp;
}
function pascalTriangle(n: number): number[] {
  // Baris pertama segitiga Pascal
  let row: number[] = [1];
  // Loop untuk baris berikutnya
  for (let i = 1; i <= n; i++) {
    // Inisialisasi elemen baris baru
    const nextRow: number[] = [];
    // Menghitung elemen baris baru
    for (let j = 0; j <= i; j++) {
      // Elemen pertama dan terakhir selalu 1
      if (j === 0 || j === i) {
        nextRow[j] = 1;
      } else {
        // Menghitung elemen di tengah
        nextRow[j] = row[j - 1] + row[j];
      }
    }

    // Menyimpan baris baru
    row = nextRow;
  }

  // Mengembalikan baris ke-n
  return row;
}
