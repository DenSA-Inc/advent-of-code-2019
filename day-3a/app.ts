import linereader from "line-reader";

enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R"
}

interface ICoordinates {
  x: number;
  y: number;
}

interface IInstruction {
  direction: Direction;
  distance: number;
}

let path1: ICoordinates[] = [];
let path2: ICoordinates[] = [];
const move = (array: ICoordinates[], input: IInstruction): ICoordinates[] => {
  let lastCoordinates: ICoordinates = array[array.length - 1];
  if (!lastCoordinates) {
    lastCoordinates = { x: 0, y: 0 };
  }
  for (let index = 0; index < input.distance; index++) {
    switch (input.direction) {
      case Direction.Up:
        array.push({ x: lastCoordinates.x, y: lastCoordinates.y + 1 });
        break;
      case Direction.Down:
        array.push({ x: lastCoordinates.x, y: lastCoordinates.y - 1 });
        break;
      case Direction.Left:
        array.push({ x: lastCoordinates.x - 1, y: lastCoordinates.y });
        break;
      case Direction.Right:
        array.push({ x: lastCoordinates.x + 1, y: lastCoordinates.y });
        break;
    }
  }
  return array;
};

let iteration = 1;
linereader.eachLine(`./day-3a/input.txt`, (line, last) => {
  const stringArray: string[] = line.split(`,`);
  const instructions: IInstruction[] = stringArray.map(value => {
    const dir: Direction = value.slice(0, 1) as Direction;
    const dist: number = parseInt(value.slice(1), 10);
    return { direction: dir, distance: dist };
  });

  const matches: ICoordinates[] = [];
  const distances: number[] = [];

  for (const instruction of instructions) {
    if (iteration === 1) {
      path1 = move(path1, instruction);
    } else if (iteration === 2) {
      path2 = move(path2, instruction);
    }
  }
  ++iteration;

  if (last) {
    for (const entry1 of path1) {
      for (const entry2 of path2) {
        // console.log(`Comparing ${entry1} to ${entry2}`);
        if (entry1.x === entry2.x && entry1.y === entry2.y) {
          matches.push(entry1);
        }
      }
    }

    console.log(matches);
    console.log(matches[0]);
    if (matches) {
      console.log(`matches exists.`);
      for (const match of matches) {
        distances.push(Math.abs(match.x) + Math.abs(match.y));
      }
    }

    console.log(distances.toString());
    console.log(distances[0]);
    if (distances) {
      // console.log(Math.min(...distances));
      let minValue = distances[0];
      for (const value of distances) {
        if (value < minValue) {
          minValue = value;
        }
      }
      console.log(`minValue: ${minValue}.`);
    }
  }
});
