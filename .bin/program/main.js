"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Beizer_1 = require("./Beizer");
var utils_1 = require("./utils");
// A simple function to parse command-line arguments
function parseArgs(argv) {
    var args = { port: 3000, mode: "development" }; // Default values
    argv.forEach(function (val, index) {
        if (val === "--port" && argv[index + 1]) {
            args.port = parseInt(argv[index + 1]);
        }
        else if (val === "--mode" && argv[index + 1]) {
            args.mode = argv[index + 1];
        }
    });
    return args;
}
// const args = parseArgs(process.argv);
// console.log(args);
// Create 3 random points
var points = Array();
for (var i = 0; i < 3; i++) {
    points.push((0, utils_1.randomPoint)());
}
console.log(points);
console.log((0, Beizer_1.QuadraticBezierCurve)(points));
