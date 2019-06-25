import { Actor } from "./actor";
import { MapEntity } from "./display";
import { GameMap } from "./map";

export class TestNPC implements Actor {
    appearance: MapEntity;

    // FIXME: this introduces circular dependency
    // entire map/actor/movement/input system is to be rebuilt
    // with async/await main loop
    map: GameMap;

    act() {
        const choice = Math.random();
        if (choice <= 0.2) {
            return;
        } else if (choice <= 0.4) {
            if (this.map.isPositionAvailable(this.appearance.x + 1, this.appearance.y)) {
                this.appearance.x += 1;
            }
        } else if (choice <= 0.6) {
            if (this.map.isPositionAvailable(this.appearance.x - 1, this.appearance.y)) {
                this.appearance.x -= 1;
            }
        } else if (choice <= 0.8) {
            if (this.map.isPositionAvailable(this.appearance.x, this.appearance.y + 1)) {
                this.appearance.y += 1;
            }
        } else {
            if (this.map.isPositionAvailable(this.appearance.x, this.appearance.y - 1)) {
                this.appearance.y -= 1;
            }
        }

        return;
    }

    constructor(x: number, y: number, map: GameMap) {
        this.appearance = { x, y, tile: { glyph: "N", fgColor: "#00ffff", bgColor: "#000000" } };
        this.map = map;
    }
}
