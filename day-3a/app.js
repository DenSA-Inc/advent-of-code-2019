"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var line_reader_1 = __importDefault(require("line-reader"));
var Direction;
(function (Direction) {
    Direction["Up"] = "U";
    Direction["Down"] = "D";
    Direction["Left"] = "L";
    Direction["Right"] = "R";
})(Direction || (Direction = {}));
var path1 = [];
var path2 = [];
var move = function (array, input) {
    var lastCoordinates = array[array.length - 1];
    if (!lastCoordinates) {
        lastCoordinates = { x: 0, y: 0 };
    }
    for (var index = 0; index < input.distance; index++) {
        switch (input.direction) {
            case Direction.Up:
                array.push({ x: lastCoordinates.x, y: lastCoordinates.y + 1 + index });
                break;
            case Direction.Down:
                array.push({ x: lastCoordinates.x, y: lastCoordinates.y - 1 - index });
                break;
            case Direction.Left:
                array.push({ x: lastCoordinates.x - 1 - index, y: lastCoordinates.y });
                break;
            case Direction.Right:
                array.push({ x: lastCoordinates.x + 1 + index, y: lastCoordinates.y });
                break;
        }
    }
    return array;
};
var iteration = 1;
line_reader_1.default.eachLine("./day-3a/input.txt", function (line, last) {
    var stringArray = line.split(",");
    var instructions = stringArray.map(function (value) {
        var dir = value.slice(0, 1);
        var dist = parseInt(value.slice(1), 10);
        return { direction: dir, distance: dist };
    });
    var matches = [];
    var distances = [];
    for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
        var instruction = instructions_1[_i];
        if (iteration === 1) {
            path1 = move(path1, instruction);
        }
        else if (iteration === 2) {
            path2 = move(path2, instruction);
        }
    }
    ++iteration;
    if (last) {
        for (var _a = 0, path1_1 = path1; _a < path1_1.length; _a++) {
            var entry1 = path1_1[_a];
            for (var _b = 0, path2_1 = path2; _b < path2_1.length; _b++) {
                var entry2 = path2_1[_b];
                // console.log(`Comparing ${entry1} to ${entry2}`);
                if (entry1.x === entry2.x && entry1.y === entry2.y) {
                    matches.push(entry1);
                }
            }
        }
        console.log(matches);
        console.log(matches[0]);
        if (matches) {
            console.log("matches exists.");
            for (var _c = 0, matches_1 = matches; _c < matches_1.length; _c++) {
                var match = matches_1[_c];
                distances.push(Math.abs(match.x) + Math.abs(match.y));
            }
        }
        console.log(distances.toString());
        console.log(distances[0]);
        if (distances) {
            // console.log(Math.min(...distances));
            var minValue = distances[0];
            for (var _d = 0, distances_1 = distances; _d < distances_1.length; _d++) {
                var value = distances_1[_d];
                if (value < minValue) {
                    minValue = value;
                }
            }
            console.log("minValue: " + minValue + ".");
        }
    }
});
