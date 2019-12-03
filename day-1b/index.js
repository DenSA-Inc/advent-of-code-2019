"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var line_reader_1 = __importDefault(require("line-reader"));
var calcFuel = function (mass) {
    return Math.floor(mass / 3) - 2;
};
var fuelSubtotal = function (mass) {
    var subtotal = 0;
    while (mass > 0) {
        mass = calcFuel(mass);
        if (mass > 0) {
            subtotal += mass;
        }
    }
    return subtotal;
};
var total = 0;
line_reader_1.default.eachLine("./day-1b/input.txt", function (line, last) {
    var thisNum = parseInt(line, 10);
    total += fuelSubtotal(thisNum);
    if (last) {
        console.log(total);
    }
});
// Test case:
// console.log(fuelSubtotal(1969));
