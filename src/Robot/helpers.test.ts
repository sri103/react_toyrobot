import { isPositionValid, move, updateDirection } from "./helpers";
import { Direction, Operations, Robot } from "./types";


  describe('isPositionValid', () => {
    it('should return false if a coordinate is equals or more than 5', () => {
      expect(isPositionValid(5)).toEqual(false);
    });

    it('should return true if a coordinate is less than 5', () => {
        expect(isPositionValid(4)).toEqual(true);
    });
  });

    const updateDirectionTestData = [
        ['NORTH', 'RIGHT', 'WEST'], 
        ['EAST', 'RIGHT', 'NORTH'],
        ['SOUTH', 'RIGHT', 'EAST'],
        ['WEST', 'RIGHT', 'SOUTH'],
        ['NORTH', 'LEFT', 'EAST'], 
        ['EAST', 'LEFT', 'SOUTH'],
        ['SOUTH', 'LEFT', 'WEST'],
        ['WEST', 'LEFT', 'NORTH'],
    ]
    describe.each(updateDirectionTestData)('updateDirection', (a, b, c) => {
        it(`should update direction to be ${c} when operation is ${b} and current direction is ${a}`, () => {
            const robo: Robot = {
                positionX: 0,
                positionY: 0,
                direction: a as Direction,
                isPlacedOnGrid: true
            }
            expect(updateDirection(robo, b as Operations)?.direction).toEqual(c)
        });
    });

    const params = [
        ['NORTH', {x:0,y:0}, {x:0,y:1}],
        ['NORTH', {x:1,y:3}, {x:1,y:4}],
        ['NORTH', {x:0,y:4}, {x:0,y:4}],
        ['SOUTH', {x:0,y:0}, {x:0,y:0}],
        ['SOUTH', {x:1,y:3}, {x:1,y:2}],
        ['SOUTH', {x:0,y:4}, {x:0,y:3}],
        ['EAST', {x:0,y:0}, {x:1,y:0}],
        ['EAST', {x:1,y:3}, {x:2,y:3}],
        ['EAST', {x:4,y:4}, {x:4,y:4}],
        ['WEST', {x:0,y:0}, {x:0,y:0}],
        ['WEST', {x:1,y:3}, {x:0,y:3}],
        ['WEST', {x:4,y:4}, {x:3,y:4}],
    ]
    describe.each(params)('move', (a, b, c) => {
        it(`should move to x:${c.x} y:${c.y} when current direction is ${a} and position is x:${b.x} y:${b.y}`, () => {
            const robo: Robot = {
                positionX: b.x,
                positionY: b.y,
                direction: a as Direction,
                isPlacedOnGrid: true
            }
            const updatedRobo = move(robo);
            expect(updatedRobo?.positionX).toEqual(c.x);
            expect(updatedRobo?.positionY).toEqual(c.y);
        });
    });
