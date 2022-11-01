export type Direction =   'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export type Position = {
    x: number | undefined;
    y: number | undefined;
}

export type Robot = {
    positionX: number | undefined;
    positionY: number | undefined;
    direction: Direction | undefined;
    isPlacedOnGrid: boolean;

}

export type Operations = 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT'
