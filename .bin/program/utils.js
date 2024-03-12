"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPoint = void 0;
function randomPoint() {
    // Define the range for x and y values, for example, 0 to 100
    var range = 100;
    return {
        x: Math.random() * range,
        y: Math.random() * range,
    };
}
exports.randomPoint = randomPoint;
