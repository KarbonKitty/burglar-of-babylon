import { Actor } from "./actor";
import { MapEntity } from "./display";

export class TestNPC implements Actor {
    appearance: MapEntity;

    act(): void {
        const choice = Math.random();
        if (choice <= 0.2) {
            return;
        } else if (choice <= 0.4) {
            this.appearance.x += 1;
        } else if (choice <= 0.6) {
            this.appearance.x -= 1;
        } else if (choice <= 0.8) {
            this.appearance.y += 1;
        } else {
            this.appearance.y -= 1;
        }

        return;
    }

    constructor(x: number, y: number) {
        this.appearance = { x, y, tile: { glyph: "N", fgColor: "#00ffff", bgColor: "#000000" } };
    }
}
