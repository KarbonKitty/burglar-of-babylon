import { Actor } from "./actor";
import { GameMap } from "../map";
import { GamePosition } from "../position";
import { Tile, DisplayManager } from "../display";
import { Inventory } from "../items/inventory";
import { items } from "../data/items";

export class Player implements Actor {
    name: string;
    tile: Tile;
    position: GamePosition;
    isPlayerTurn: boolean = false;
    alertLevel: number = 0;
    inventory = new Inventory();

    private _resolve: ((value?: void | PromiseLike<void> | undefined) => void) | null = null;
    private _map: GameMap | null = null;
    private _display: DisplayManager;

    constructor(name: string, x: number, y: number, displayManager: DisplayManager) {
        this.position = new GamePosition(x, y);
        this.name = name;
        this.tile = { glyph: '@', color: '#ffffff' };
        this._display = displayManager;
        this.inventory.items.push(items.signalJammer);
    }

    act(map: GameMap): Promise<void> {
        this.isPlayerTurn = true;
        this._map = map;
        return new Promise((resolve) => this._resolve = resolve);
    }

    stopAct() {
        this.isPlayerTurn = false;
        this.checkAlertLevel();
        this._display.drawMessages();
        this._resolve!();
    }

    displayInventory() {
        this._display.addTemporaryMessage("Please select an item to use (press corresponding number)");
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
