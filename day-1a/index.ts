import lineReader from "line-reader";

const calcFuel = (mass: number): number => {
  return Math.floor(mass / 3) - 2;
};

let total: number = 0;
lineReader.eachLine(`./day-1a/input.txt`, (line, last) => {
  const thisNum: number = parseInt(line, 10);
  total += calcFuel(thisNum);

  if (last) {
    console.log(total);
  }
});
