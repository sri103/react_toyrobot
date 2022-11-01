import { Direction, Operations, Robot } from "./types";

const gridSize = 5;

export const isPositionValid = (position: number) : boolean => {
    return position > -1 && position < gridSize;
}

export const updateDirection = (robo:Robot, operation: Operations): Robot | undefined => {
    if(!robo.direction) {
        return undefined;
    }
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentDirectionIndex = directions.indexOf(robo.direction);

    switch(operation) {
        case 'LEFT' :
            return {...robo, direction: (directions[currentDirectionIndex + 1] || 'NORTH') as Direction};
        case 'RIGHT' : 
            return {...robo, direction: (directions[currentDirectionIndex - 1] || 'WEST') as Direction};
        default:
            return robo;
    }

}
export const move = (robo: Robot) : Robot | undefined => {
    if(robo.positionX === undefined || robo.positionY === undefined) {
        return undefined;
    }
    switch (robo.direction) {
        case 'NORTH':
            if(robo.positionY < gridSize-1) {
                return {...robo, positionY: robo.positionY + 1}
            }
            break;
        case 'EAST':
            if(robo.positionX < gridSize-1) {
                return {...robo, positionX: robo.positionX + 1}
            }
            break;
        case 'SOUTH':
            if(robo.positionY > 0 ) {
                return {...robo, positionY: robo.positionY - 1}
            }
            break;
        case 'WEST':
            if(robo.positionX > 0) {
                return {...robo, positionX: robo.positionX - 1}
            }
            break;
        default:
      }
      return robo;
}