import { Tile } from "../display";
import { GamePosition, Directions } from "../position";
import { GameMap } from "../map";
import { Condition } from "./condition";
import { Inventory } from "../items/inventory";

export interface Actor {
    name: string;
    tile: Tile;
    position: GamePosition;
    direction: Directions;
    sightRadius: number;
    inventory: Inventory;
    // TODO: handle those better
    conditions: Condition[];
    act(actor: Actor, map: GameMap): Promise<void>;
}
