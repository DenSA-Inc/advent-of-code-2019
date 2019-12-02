"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var line_reader_1 = __importDefault(require("line-reader"));
var calcFuel = function (mass) {
    return Math.floor(mass / 3) - 2;
};
var total = 0;
line_reader_1.default.eachLine("./day-1a/input.txt", function (line, last) {
    var thisNum = parseInt(line, 10);
    total += calcFuel(thisNum);
    if (last) {
        console.log(total);
    }
});
