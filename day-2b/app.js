"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Operator;
(function (Operator) {
    Operator[Operator["Addition"] = 1] = "Addition";
    Operator[Operator["Multiply"] = 2] = "Multiply";
    Operator[Operator["End"] = 99] = "End";
})(Operator || (Operator = {}));
var targetNum = 19690720;
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
    return workArray;
};
var calc = function (inputs) {
    // const iresult: IResult
    var data = fs_1.default.readFileSync("./day-2a/input.txt", "utf8");
    var stringArray = data.split(",");
    var numArray = stringArray.map(function (value) {
        return parseInt(value, 10);
    });
    // Place inputs:
    numArray[1] = inputs[0];
    numArray[2] = inputs[1];
    var calculated = intcode(numArray);
    var returnVal = {
        inputs: 100 * inputs[0] + inputs[1],
        output: calculated[0]
    };
    return returnVal;
};
(function () {
    for (var i = 0; i < 99; i++) {
        for (var j = 0; j < 99; j++) {
            var k = calc([i, j]);
            if (k.output === targetNum) {
                console.log(k.inputs);
                break;
            }
        }
    }
})();
