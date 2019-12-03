import fs from "fs";

const testInput1: string = `1,0,0,0,99`;
const testInput2: string = `2,3,0,3,99`;
const testInput3: string = `2,4,4,5,99,0`;
const testInput4: string = `1,1,1,4,99,5,6,0,99`;

enum Operator {
  Addition = 1,
  Multiply = 2,
  End = 99
}

const intcode = (workArray: number[]): string => {
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

  return workArray.join(`,`);
};

// Test input:
// const stringArray: string[] = testInput1.split(`,`);

// Real input:
fs.readFile(`./day-2a/input.txt`, `utf8`, (err, data) => {
  const stringArray: string[] = data.split(`,`);
  const numArray: number[] = stringArray.map(value => {
    return parseInt(value, 10);
  });

  // Set up "1202 program alarm":
  numArray[1] = 12;
  numArray[2] = 2;

  const finalString: string = intcode(numArray);

  console.log(finalString.split(`,`)[0]);
});
