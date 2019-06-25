import { Actor } from "./actor";
import { Engine } from 'rot-js';
import { Tile } from "./display";
import { GamePosition } from "./position";

export class Player implements Actor {
    tile: Tile;
    position: GamePosition;
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
        this.position = new GamePosition(x, y);
        this.tile = { glyph: '@', fgColor: '#ffffff', bgColor: '#000000' };

        this.engine = engine;
    }
}
