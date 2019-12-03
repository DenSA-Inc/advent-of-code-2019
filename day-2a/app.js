"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var testInput1 = "1,0,0,0,99";
var testInput2 = "2,3,0,3,99";
var testInput3 = "2,4,4,5,99,0";
var testInput4 = "1,1,1,4,99,5,6,0,99";
var Operator;
(function (Operator) {
    Operator[Operator["Addition"] = 1] = "Addition";
    Operator[Operator["Multiply"] = 2] = "Multiply";
    Operator[Operator["End"] = 99] = "End";
})(Operator || (Operator = {}));
var intcode = function (workArray) {
    for (var index = 0; index < workArray.length; index += 4) {
        var op = workArray[index];
        if (op === Operator.End) {
            break;
        }
        var index1 = workArray[index + 1];
        var index2 = workArray[index + 2];
        var target = workArray[index + 3];
        workArray[target] =
            op === Operator.Addition
                ? workArray[index1] + workArray[index2]
                : workArray[index1] * workArray[index2];
    }
    return workArray.join(",");
};
// Test input:
// const stringArray: string[] = testInput1.split(`,`);
// Real input:
fs_1.default.readFile("./day-2a/input.txt", "utf8", function (err, data) {
    var stringArray = data.split(",");
    var numArray = stringArray.map(function (value) {
        return parseInt(value, 10);
    });
    // Set up "1202 program alarm":
    numArray[1] = 12;
    numArray[2] = 2;
    var finalString = intcode(numArray);
    console.log(finalString.split(",")[0]);
});
