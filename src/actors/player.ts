import { Actor } from "./actor";
import { Tile } from "../display";
import { GamePosition } from "../position";

export class Player implements Actor {
    tile: Tile;
    position: GamePosition;
    isPlayerTurn: boolean = false;

    private _resolve: ((value?: void | PromiseLike<void> | undefined) => void) | null = null;

    act(): Promise<void> {
        this.isPlayerTurn = true;
        return new Promise(resolve => this._resolve = resolve);
    }

    stopAct() {
        this._resolve!();
        this.isPlayerTurn = false;
    }

    constructor(x: number, y: number) {
        this.position = new GamePosition(x, y);
        this.tile = { glyph: '@', fgColor: '#ffffff', bgColor: '#000000' };
    }
}
