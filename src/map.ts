import { Tile } from "./display";
import { Actor } from "./actors/actor";
import { GamePosition } from "./position";
import { mapTiles } from "./data/tiles";

export class GameMap {
    tileArray: Array<MapTile> = [];
    actorList: Array<Actor> = [];

    width: number;
    height: number;

    constructor(textMap: string[]) {
        this.height = textMap.length;
        const chars = textMap.map(s => s.split(''));
        this.width = chars[0].length;

        chars.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                this.tileArray[rowIndex * this.width + colIndex] = mapTiles.get(col)!;
            });
        });
    }

    isPositionAvailable(position: GamePosition) {
        const tile = this.tileArray[this.width * position.y + position.x];
        return tile.passable;
    }

    positionFromIndex(index: number) {
        return new GamePosition(index % this.width, Math.floor(index / this.height));
    }

    lightPasses(x: number, y: number) {
        return this.tileArray[this.width * y + x].transparent;
    }
}

export interface MapTile {
    name: string,
    description: string,
    tile: Tile,
    passable: boolean,
    transparent: boolean
}
