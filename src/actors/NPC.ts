import { Actor } from "./actor";
import { GameMap } from "../map";
import { Tile } from '../display';
import { GamePosition } from "../position";
import { AI } from "./ai";

export class NPC implements Actor {
    tile: Tile;
    position: GamePosition;
    sightRadius: number;
    act: (actor: Actor, map: GameMap) => Promise<void>;

    private ai: AI;

    constructor(tile: Tile, x: number, y: number, sightRadius: number, ai: AI) {
        this.position = new GamePosition(x, y);
        this.tile = tile;
        this.sightRadius = sightRadius;
        this.ai = ai;
        this.act = ai.act.bind(ai);
    }
}
