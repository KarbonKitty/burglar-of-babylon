import { Actor } from "./actor";
import { GameMap } from "./map";
import { Tile } from './display';
import { GamePosition } from "./position";

export class TestNPC implements Actor {
    tile: Tile;
    position: GamePosition;

    // FIXME: this introduces circular dependency
    // entire map/actor/movement/input system is to be rebuilt
    // with async/await main loop
    map: GameMap;

    act() {
        const choice = Math.random();
        let newPosition: GamePosition;
        if (choice <= 0.2) {
            return;
        } else if (choice <= 0.4) {
            newPosition = this.position.east;
        } else if (choice <= 0.6) {
            newPosition = this.position.west;
        } else if (choice <= 0.8) {
            newPosition = this.position.south;
        } else {
            newPosition = this.position.north;
        }

        if (this.map.isPositionAvailable(newPosition)) {
            this.position = newPosition;
        }
    }

    constructor(x: number, y: number, map: GameMap) {
        this.position = new GamePosition(x, y);
        this.tile = { glyph: 'N', fgColor: '#00ffff', bgColor: '#000000' };

        this.map = map;
    }
}
