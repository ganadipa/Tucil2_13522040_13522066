"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadraticBezierCurve = void 0;
function middlePoint(s) {
    var xp = (s.start.x + s.end.x) / 2;
    var yp = (s.start.y + s.end.y) / 2;
    return {
        x: xp,
        y: yp,
    };
}
// Nyoba dulu dengan iterasi ke 1
function QuadraticBezierCurve(points) {
    var middle1 = middlePoint({ start: points[0], end: points[1] });
    var middle2 = middlePoint({ start: points[1], end: points[2] });
    var middle = middlePoint({ start: middle1, end: middle2 });
    return [points[0], middle, points[2]];
}
exports.QuadraticBezierCurve = QuadraticBezierCurve;
