import { Tile } from "../display";
import { GamePosition } from "../position";
import { GameMap } from "../map";

export interface Actor {
    tile: Tile;
    position: GamePosition;
    sightRadius: number;
    act(map: GameMap): Promise<void>;
}
