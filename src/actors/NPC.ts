import { Actor } from "./actor";
import { GameMap } from "../map";
import { Tile } from '../display';
import { GamePosition } from "../position";

export class NPC implements Actor {
    tile: Tile;
    position: GamePosition;
    act: (map: GameMap) => Promise<void>;

    constructor(x: number, y: number, ai: (actor: Actor, map: GameMap) => Promise<void>) {
        this.position = new GamePosition(x, y);
        this.tile = { glyph: 'N', fgColor: '#00ffff', bgColor: '#000000' };
        this.act = ai.bind(null, this);
    }
}
