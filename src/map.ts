import { MapEntity } from "./display";
import { Actor } from "./actor";

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
                this.tileArray[rowIndex * this.width + colIndex] = col === '.' ? new MapTile({ x: colIndex, y: rowIndex, tile: { glyph: '.', fgColor: '#ffffff', bgColor: '#000000' }}, true, true) : new MapTile({ x: colIndex, y: rowIndex, tile: { glyph: '#', fgColor: '#ffffff', bgColor: '#000000' } }, false, false);
            });
        });
    }
}

export class MapTile {
    constructor(
        public appearance: MapEntity,
        public passable: boolean,
        public transparent: boolean
    ) {}
}
