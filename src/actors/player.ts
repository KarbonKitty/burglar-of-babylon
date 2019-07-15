import { Actor } from "./actor";
import { GameMap } from "../map";
import { GamePosition } from "../position";
import { Tile } from "../display";
import { Inventory } from "../items/inventory";
import { items } from "../data/items";
import { time } from "../time";
import { Item } from "../items/item";

export class Player implements Actor {
    name: string;
    tile: Tile;
    position: GamePosition;
    sightRadius = 10;
    isPlayerTurn: boolean = false;
    alertLevel: number = 0;
    inventory = new Inventory();

    private _resolve: ((value?: void | PromiseLike<void> | undefined) => void) | null = null;
    private _map: GameMap | null = null;

    constructor(name: string, x: number, y: number) {
        this.position = new GamePosition(x, y);
        this.name = name;
        this.tile = { glyph: '@', color: '#ffffff' };

        // TODO: move this somewhere else
        this.inventory.addItem(new Item(items.watch));
    }

    act(map: GameMap): Promise<void> {
        this.isPlayerTurn = true;
        this._map = map;
        return new Promise((resolve) => this._resolve = resolve);
    }

    stopAct() {
        this.isPlayerTurn = false;
        this.checkAlertLevel();
        time.tick(1000);
        this._resolve!();
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
