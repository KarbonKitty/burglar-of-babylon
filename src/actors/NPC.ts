import { Actor } from "./actor";
import { GameMap } from "../map";
import { Tile } from '../display';
import { GamePosition } from "../position";
import { AI } from "./ai";
import { Condition } from "./condition";

export class NPC implements Actor {
    name: string;
    tile: Tile;
    position: GamePosition;
    sightRadius: number;
    conditions: Condition[];
    act: (actor: Actor, map: GameMap) => Promise<void>;

    private ai: AI;

    constructor(name: string, tile: Tile, x: number, y: number, sightRadius: number, ai: AI) {
        this.name = name;
        this.position = new GamePosition(x, y);
        this.tile = tile;
        this.sightRadius = sightRadius;
        this.ai = ai;
        this.act = ai.act.bind(ai);

        this.conditions = [];
    }
}
