"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BezierCurve = exports.DnCBezierCurve = exports.QuadraticBezierCurve = void 0;
var BezierBruteForce_1 = require("./BezierBruteForce");
function middlePoint(s) {
    var xp = (s.start.x + s.end.x) / 2;
    var yp = (s.start.y + s.end.y) / 2;
    return {
        x: xp,
        y: yp,
    };
}
function QuadraticBezierCurve(params) {
    var points = params.points, iteration = params.iteration, type = params.type;
    var result;
    var startTime = performance.now();
    if (type === "DnC") {
        result = QuadraticBezierDnC(points, iteration);
    }
    else {
        result = (0, BezierBruteForce_1.QuadraticBezierBruteForce)(points, iteration);
    }
    var endTime = performance.now();
    return { points: result, duration: endTime - startTime };
}
exports.QuadraticBezierCurve = QuadraticBezierCurve;
function QuadraticBezierDnC(points, iteration) {
    var middle1 = middlePoint({ start: points[0], end: points[1] });
    var middle2 = middlePoint({ start: points[1], end: points[2] });
    var middle = middlePoint({ start: middle1, end: middle2 });
    if (iteration <= 1) {
        return [points[0], middle, points[2]];
    }
    var first = QuadraticBezierDnC([points[0], middle1, middle], iteration - 1);
    var second = QuadraticBezierDnC([middle, middle2, points[2]], iteration - 1);
    return __spreadArray(__spreadArray([], first, true), second.slice(1), true);
}
function DnCBezierCurve(points, iteration) {
    var startTime = performance.now();
    var result = BezierCurve(points, iteration);
    var endTime = performance.now();
    return {
        points: result,
        duration: endTime - startTime,
    };
}
exports.DnCBezierCurve = DnCBezierCurve;
function BezierCurve(points, iteration) {
    var degree = points.length;
    var middles = [];
    for (var i = 0; i < degree; i++) {
        middles.push([]);
        middles[0].push(points[i]);
    }
    for (var i = 1; i < degree; i++) {
        for (var j = 0; j < degree - i; j++) {
            middles[i].push(middlePoint({
                start: middles[i - 1][j],
                end: middles[i - 1][j + 1],
            }));
        }
    }
    var first = [], second = [];
    for (var i = 0; i < degree; i++) {
        first.push(middles[i][0]);
    }
    for (var i = degree - 1; i >= 0; i--) {
        second.push(middles[i].at(-1));
    }
    if (iteration === 1) {
        var result = [];
        for (var i = 0; i < degree; i += 2) {
            result.push(middles[i][0]);
        }
        if (degree & 1)
            result = result.slice(0, -1);
        var another = [];
        for (var i = 0; i < degree; i += 2) {
            another.push(middles[i].at(-1));
        }
        another.reverse();
        return [points[0], middles[degree - 1][0], points[degree - 1]];
    }
    else {
        return BezierCurve(first, iteration - 1).concat(BezierCurve(second, iteration - 1).slice(1));
    }
}
exports.BezierCurve = BezierCurve;
