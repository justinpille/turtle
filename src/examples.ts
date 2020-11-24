import { pack } from "./pack";

const one = `
  back 50
  repeat 100
    forward 200
    left 179
  end
  define rectangle side1 side2
    forward side1
    right 90
    forward side2
    right 90
    forward side1
    right 90
    forward side2
    right 90
  end
  rectangle 200 300
  define square
    repeat 4
      forward square.size
      right 90
    end
  end
  set square.size 400
  square
`;

export const examples = [
  {
    name: "one",
    program: pack(one),
  },
];
