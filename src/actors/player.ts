import { Actor } from "./actor";
import { Tile } from "../display";
import { GamePosition } from "../position";
import { GameMap } from "../map";

export class Player implements Actor {
    name: string;
    tile: Tile;
    position: GamePosition;
    isPlayerTurn: boolean = false;
    alertLevel: number = 0;

    private _resolve: ((value?: void | PromiseLike<void> | undefined) => void) | null = null;
    private _map: GameMap | null = null;

    act(map: GameMap): Promise<void> {
        this.isPlayerTurn = true;
        this._map = map;
        return new Promise(resolve => this._resolve = resolve);
    }

    stopAct() {
        this.isPlayerTurn = false;
        this.checkAlertLevel();
        this._resolve!();
    }

    constructor(name: string, x: number, y: number) {
        this.position = new GamePosition(x, y);
        this.name = name;
        this.tile = { glyph: '@', fgColor: '#ffffff', bgColor: '#000000' };
    }

    private checkAlertLevel() {
        if (this._map === null) {
            return;
        }

        const playerMapIndex = this._map.positionToIndex(this.position);
        const isPlayerRevealed = !!this._map.enemyVision[playerMapIndex];

        if (isPlayerRevealed) {
            this.alertLevel++;
        }

        if (this.alertLevel >= 5) {
            alert("You have been caught!");
        }
    }
}
