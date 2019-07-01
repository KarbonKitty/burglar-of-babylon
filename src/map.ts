import { Tile } from "./display";
import { Actor } from "./actors/actor";
import { GamePosition } from "./position";
import { mapTiles } from "./data/tiles";
import { FOV } from "rot-js";
import RecursiveShadowcasting from "rot-js/lib/fov/recursive-shadowcasting";

export class GameMap {
    tileArray: Array<MapTile> = [];
    actorList: Array<Actor> = [];

    playerMemory: Array<boolean> = [];
    visibilityMask: Array<boolean> = [];

    width: number;
    height: number;

    private fov: RecursiveShadowcasting;

    constructor(textMap: string[]) {
        this.height = textMap.length;
        const chars = textMap.map(s => s.split(''));
        this.width = chars[0].length;

        chars.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                const newTile = mapTiles.get(col);
                if (typeof newTile === 'undefined') {
                    throw new Error(`Tile ${col} is undefined!`);
                }
                this.tileArray[rowIndex * this.width + colIndex] = newTile;
            });
        });

        this.fov = new FOV.RecursiveShadowcasting(this.lightPasses.bind(this));
    }

    isPositionAvailable(position: GamePosition) {
        return this.tileArray[this.width * position.y + position.x].passable;
    }

    positionFromIndex(index: number) {
        return new GamePosition(index % this.width, Math.floor(index / this.height));
    }

    lightPasses(x: number, y: number) {
        const tile = this.tileArray[this.width * y + x];
        if (typeof tile === 'undefined') {
            throw new Error(`Tile at position ${x}, ${y} = ${this.width * y + x} is undefined`);
        }
        return tile.transparent;
    }

    recalculateFov(position: GamePosition, radius: number) {
        this.visibilityMask = [];
        this.fov.compute(position.x, position.y, radius, (x, y) => {
            const index = this.xyToIndex(x, y);
            this.visibilityMask[index] = true;
            this.playerMemory[index] = true;
        });
    }

    private xyToIndex(x: number, y: number) {
        return this.width * y + x;
    }

    private positionToIndex(position: GamePosition) {
        return this.width * position.y + position.x;
    }
}

export interface MapTile {
    name: string,
    description: string,
    tile: Tile,
    passable: boolean,
    transparent: boolean
}
