import { Actor } from "./actor";
import { Engine } from 'rot-js';
import { MapEntity } from "./display";
import handleInput from "./input";

export class Player implements Actor {
    appearance: MapEntity;

    private engine: Engine;

    private inputHandler = (e: KeyboardEvent) => handleInput(e, this)

    act(): void {
        this.engine.lock();
        addEventListener("keydown", this.inputHandler);
    }

    stopAct() {
        removeEventListener("keydown", this.inputHandler);
        this.engine.unlock();
    }

    constructor(x: number, y: number, engine: Engine) {
        this.appearance = { x, y, tile: { glyph: "@", fgColor: "#ffffff", bgColor: "#000000" } };

        this.engine = engine;
    }
}