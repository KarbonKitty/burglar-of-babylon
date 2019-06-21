import { Tile } from "./tile";

export class MapEntity {
    constructor(public tile: Tile, public x: number, public y: number) {}
}
