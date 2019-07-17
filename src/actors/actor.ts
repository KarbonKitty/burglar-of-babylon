import { Tile } from "../display";
import { GamePosition } from "../position";
import { GameMap } from "../map";
import { Condition } from "./condition";

export interface Actor {
    name: string;
    tile: Tile;
    position: GamePosition;
    sightRadius: number;
    // TODO: handle those better
    conditions: Condition[];
    act(actor: Actor, map: GameMap): Promise<void>;
}
