"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bezier_1 = require("./Bezier");
function main() {
    // Dilakukan untuk melihat perbedaan speed antara bruteforce dengan dnc
    // dilakukan diluar web browser menghindari terjadinya caching.
    var points = [
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
    var time = performance.now();
    for (var i = 0; i < 1; i++) {
        (0, Bezier_1.QuadraticBezierCurve)({ points: points, iteration: 22, type: "DnC" });
    }
    console.log("DnC:", performance.now() - time, " milliseconds");
    time = performance.now();
    for (var i = 0; i < 1; i++) {
        (0, Bezier_1.QuadraticBezierCurve)({
            points: points,
            iteration: 22,
            type: "Bruteforce",
        });
    }
    console.log("Bruteforce:", performance.now() - time, " milliseconds");
}
main();
