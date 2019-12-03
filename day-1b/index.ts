import lineReader from "line-reader";

const calcFuel = (mass: number): number => {
  return Math.floor(mass / 3) - 2;
};

const fuelSubtotal = (mass: number): number => {
  let subtotal: number = 0;
  while (mass > 0) {
    mass = calcFuel(mass);
    if (mass > 0) {
      subtotal += mass;
    }
  }
  return subtotal;
};

let total: number = 0;
lineReader.eachLine(`./day-1b/input.txt`, (line, last) => {
  const thisNum: number = parseInt(line, 10);

  total += fuelSubtotal(thisNum);

  if (last) {
    console.log(total);
  }
});

// Test case:
// console.log(fuelSubtotal(1969));
