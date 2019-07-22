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
}
