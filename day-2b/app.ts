import fs from "fs";

enum Operator {
  Addition = 1,
  Multiply = 2,
  End = 99
}

interface IResult {
  inputs: number;
  output: number;
}

const targetNum: number = 19690720;

const intcode = (workArray: number[]): number[] => {
  for (let index = 0; index < workArray.length; index += 4) {
    const op: Operator = workArray[index];

    if (op === Operator.End) {
      break;
    }

    const index1: number = workArray[index + 1];
    const index2: number = workArray[index + 2];
    const target: number = workArray[index + 3];

    workArray[target] =
      op === Operator.Addition
        ? workArray[index1] + workArray[index2]
        : workArray[index1] * workArray[index2];
  }

  return workArray;
};

const calc = (inputs: number[]): IResult => {
  // const iresult: IResult
  const data: string = fs.readFileSync(`./day-2a/input.txt`, `utf8`);

  const stringArray: string[] = data.split(`,`);
  const numArray: number[] = stringArray.map(value => {
    return parseInt(value, 10);
  });

  // Place inputs:
  numArray[1] = inputs[0];
  numArray[2] = inputs[1];

  const calculated: number[] = intcode(numArray);

  const returnVal: IResult = {
    inputs: 100 * inputs[0] + inputs[1],
    output: calculated[0]
  };

  return returnVal;
};

(() => {
  for (let i = 0; i < 99; i++) {
    for (let j = 0; j < 99; j++) {
      const k = calc([i, j]);
      if (k.output === targetNum) {
        console.log(k.inputs);
        break;
      }
    }
  }
})();
