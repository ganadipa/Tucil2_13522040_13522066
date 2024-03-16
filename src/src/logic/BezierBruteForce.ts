import {Point} from '../types'

function QuadraticBezierBruteForce(
    points: Point[],
    iteration: number,
    increment: number
  ): Point[] {
    let numSteps: number = 3**(iteration-1); //Menghitung banyaknya (titik-2) pada suatu iterasi
    const stepSize: number = 1.0/(numSteps+1); //Menghitung jarak antar titik pada suatu iterasi
    let returnArr: Point[] = []; 
    returnArr.push(points[0]);
    for (let i = 1; i<=numSteps; i++){
      const t: number = stepSize*i;
      const xTemp: number = ((1-t)**2)*points[0].x + (1-t)*(t)*points[1].x + (t**2)*points[2].x; 
      const yTemp: number = ((1-t)**2)*points[0].y + (1-t)*(t)*points[1].y + (t**2)*points[2].y;
      const pointTemp: Point = {x: xTemp, y: yTemp};
      returnArr.push(pointTemp);
    }
    returnArr.push(points[2]);
    return returnArr;
  
  }