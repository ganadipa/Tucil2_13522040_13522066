"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadraticBezierBruteForce = void 0;
function QuadraticBezierBruteForce(points, iteration) {
    var numSteps = countNumSteps(3, iteration); //Menghitung banyaknya (titik) pada suatu iterasi
    var stepSize = 1.0 / (numSteps - 1); //Menghitung jarak antar titik pada suatu iterasi
    var returnArr = [];
    returnArr.push(points[0]);
    for (var i = 1; i <= numSteps - 2; i++) {
        var t = stepSize * i;
        var xTemp = Math.pow((1 - t), 2) * points[0].x +
            2 * (1 - t) * t * points[1].x +
            Math.pow(t, 2) * points[2].x;
        var yTemp = Math.pow((1 - t), 2) * points[0].y +
            2 * (1 - t) * t * points[1].y +
            Math.pow(t, 2) * points[2].y;
        var pointTemp = { x: xTemp, y: yTemp };
        returnArr.push(pointTemp);
    }
    returnArr.push(points[2]);
    return returnArr;
    //3
    //3 + 2
    //3 + 2 + 4
}
exports.QuadraticBezierBruteForce = QuadraticBezierBruteForce;
function NBezierBruteForce(points, iteration, nBezier //Quadratic = 2; Cubic = 3;
) {
    var numSteps = countNumSteps(3, iteration); //Menghitung banyaknya (titik) pada suatu iterasi
    var stepSize = 1.0 / (numSteps - 1); //Menghitung jarak antar titik pada suatu iterasi
    var pascalSeries = pascalTriangle(nBezier); //Mencari koefisien tiap suku pada rumus
    var returnArr = [];
    returnArr.push(points[0]); //Menambahkan titik pertama
    for (var i = 1; i <= numSteps; i++) {
        //Mencari posisi titik selain titik awal dan akhir
        var t = stepSize * i;
        var xTemp = 0;
        var yTemp = 0;
        for (var j = 0; j <= nBezier; j++) {
            xTemp +=
                pascalSeries[j] * Math.pow((1 - t), (nBezier - j)) * Math.pow(t, j) * points[j].x;
            yTemp +=
                pascalSeries[j] * Math.pow((1 - t), (nBezier - j)) * Math.pow(t, j) * points[j].y;
        }
        var pointTemp = { x: xTemp, y: yTemp };
        returnArr.push(pointTemp);
    }
    returnArr.push(points[nBezier - 1]); // Menambahkan titik terakhir
    return returnArr;
}
function countNumSteps(nBezier, iteration) {
    //Mencari berapa banyak titik pada iterasi ke-sekian
    var difference = nBezier - 1;
    var temp = nBezier;
    for (var i = 1; i < iteration; i++) {
        temp = temp + Math.pow(difference, i);
    }
    return temp;
}
function pascalTriangle(n) {
    // Baris pertama segitiga Pascal
    var row = [1];
    // Loop untuk baris berikutnya
    for (var i = 1; i <= n; i++) {
        // Inisialisasi elemen baris baru
        var nextRow = [];
        // Menghitung elemen baris baru
        for (var j = 0; j <= i; j++) {
            // Elemen pertama dan terakhir selalu 1
            if (j === 0 || j === i) {
                nextRow[j] = 1;
            }
            else {
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
