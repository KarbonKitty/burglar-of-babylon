import { Actor } from "./actor";
import { Engine } from 'rot-js';
import { MapEntity } from "./display";

export class Player implements Actor {
    appearance: MapEntity;
    isPlayerTurn: boolean = false;

    private engine: Engine;

    act(): void {
        this.engine.lock();
        this.isPlayerTurn = true;
    }

    stopAct() {
        this.isPlayerTurn = false;
        this.engine.unlock();
    }

    constructor(x: number, y: number, engine: Engine) {
        this.appearance = { x, y, tile: { glyph: "@", fgColor: "#ffffff", bgColor: "#000000" } };

        this.engine = engine;
    }
}