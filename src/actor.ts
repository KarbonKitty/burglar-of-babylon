import { Tile } from "./display";
import { GamePosition } from "./position";

export interface Actor {
    tile: Tile;
    position: GamePosition;
    act(): void;
}
