export class GamePosition {
    constructor(public x: number, public y: number) { }

    get north(): GamePosition {
        return new GamePosition(this.x, this.y - 1);
    }

    get south(): GamePosition {
        return new GamePosition(this.x, this.y + 1);
    }

    get west(): GamePosition {
        return new GamePosition(this.x - 1, this.y);
    }

    get east(): GamePosition {
        return new GamePosition(this.x + 1, this.y);
    }

    get northeast(): GamePosition {
        return new GamePosition(this.x + 1, this.y - 1);
    }

    get northwest(): GamePosition {
        return new GamePosition(this.x - 1, this.y - 1);
    }

    get southeast(): GamePosition {
        return new GamePosition(this.x + 1, this.y + 1);
    }

    get southwest(): GamePosition {
        return new GamePosition(this.x - 1, this.y + 1);
    }

    get cardinalNeighborhood(): GamePosition[] {
        return [this.north, this.east, this.south, this.west];
    }

    get neighborhood(): GamePosition[] {
        return [
            this.north,
            this.northeast,
            this.east,
            this.southeast,
            this.south,
            this.southwest,
            this.west,
            this.northwest
        ];
    }

    toEnum(): Directions | undefined {
        if (this.equalTo(dirs.north)) {
            return Directions.north;
        } else if (this.equalTo(dirs.south)) {
            return Directions.south;
        } else if (this.equalTo(dirs.east)) {
            return Directions.east;
        } else if (this.equalTo(dirs.west)) {
            return Directions.west;
        } else if (this.equalTo(dirs.northwest)) {
            return Directions.northwest;
        } else if (this.equalTo(dirs.northeast)) {
            return Directions.northeast;
        } else if (this.equalTo(dirs.southwest)) {
            return Directions.southwest;
        } else if (this.equalTo(dirs.southeast)) {
            return Directions.southeast;
        } else {
            return;
        }
    }

    directionFrom(oldPosition: GamePosition): GamePosition {
        return new GamePosition(this.x - oldPosition.x, this.y - oldPosition.y);
    }

    directionTo(newPosition: GamePosition): GamePosition {
        return newPosition.directionFrom(this);
    }

    equalTo(newPosition: GamePosition): boolean {
        return this.x === newPosition.x && this.y === newPosition.y;
    }
}

export const dirs = {
    north: new GamePosition(0, -1),
    northeast: new GamePosition(+1, -1),
    east: new GamePosition(+1, 0),
    southeast: new GamePosition(+1, +1),
    south: new GamePosition(0, +1),
    southwest: new GamePosition(-1, +1),
    west: new GamePosition(-1, 0),
    northwest: new GamePosition(-1, -1)
};

export enum Directions {
    "north",
    "northeast",
    "east",
    "southeast",
    "south",
    "southwest",
    "west",
    "northwest"
}
