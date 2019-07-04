import { Tile } from "../display";
import { GamePosition } from "../position";
import { GameMap } from "../map";

export interface Actor {
    tile: Tile;
    position: GamePosition;
    act(map: GameMap): Promise<void>;
}
