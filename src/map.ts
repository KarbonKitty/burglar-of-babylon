import { Tile } from "./display";
import { Actor } from "./actor";
import { GamePosition } from "./position";

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
                this.tileArray[rowIndex * this.width + colIndex] = col === '.' ? new MapTile({ glyph: '.', fgColor: '#ffffff', bgColor: '#000000' }, true, true) : new MapTile({ glyph: '#', fgColor: '#ffffff', bgColor: '#000000' }, false, false);
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
}

export class MapTile {
    constructor(
        public tile: Tile,
        public passable: boolean,
        public transparent: boolean
    ) {}
}
