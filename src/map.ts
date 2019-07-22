import { Tile } from "./display";
import { Actor } from "./actors/actor";
import { GamePosition } from "./position";
import { mapTiles } from "./data/tiles";
import { FOV } from "rot-js";
import RecursiveShadowcasting from "rot-js/lib/fov/recursive-shadowcasting";
import { Player } from "./actors/player";
import { Item } from "./items/item";
import { map } from "./data/floor38";

export class GameMap {
    tileArray: IMapTile[] = [];
    actorList: Actor[] = [];
    itemsList: Map<number, Item> = new Map<number, Item>();

    playerMemory: boolean[] = [];
    visibilityMask: boolean[] = [];
    enemyVision: boolean[] = [];

    width: number;
    height: number;

    private fov: RecursiveShadowcasting;

    constructor(textMap: string[]) {
        this.height = textMap.length;
        const chars = textMap.map(s => s.split(''));
        this.width = chars[0].length;

        chars.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                const newTile = mapTiles.get(col);
                if (typeof newTile === 'undefined') {
                    throw new Error(`Tile ${col} is undefined!`);
                }
                this.tileArray[rowIndex * this.width + colIndex] = newTile;
            });
        });

        this.fov = new FOV.RecursiveShadowcasting(this.lightPasses.bind(this));
    }

    isPositionAvailable(position: GamePosition) {
        const isTilePassable = this.tileArray[this.width * position.y + position.x].passable;
        const isTileOccupied = this.actorList
            .filter(a => a.position.x === position.x && a.position.y === position.y)
            .length > 0;
        return isTilePassable && !isTileOccupied;
    }

    isTilePathable(x: number, y: number, actor: Actor) {
        const tile = this.tileArray[this.xyToIndex(x, y)];

        if (typeof tile.pathable !== 'undefined') {
            return tile.pathable(actor);
        } else {
            return tile.passable;
        }
    }

    positionFromIndex(index: number) {
        return new GamePosition(index % this.width, Math.floor(index / this.height));
    }

    lightPasses(x: number, y: number) {
        const tile = this.tileArray[this.width * y + x];
        if (typeof tile === 'undefined') {
            throw new Error(`Tile at position ${x}, ${y} = ${this.width * y + x} is undefined`);
        }
        return tile.transparent;
    }

    recalculatePlayerFov() {
        const player = this.actorList.find(a => a instanceof Player);

        if (typeof player === 'undefined') {
            // TODO: add some kind of logging here?
            return;
        }

        this.visibilityMask = [];
        this.fov.compute(player.position.x, player.position.y, player.sightRadius, (x, y) => {
            const index = this.xyToIndex(x, y);
            this.visibilityMask[index] = true;
            this.playerMemory[index] = true;
        });
    }

    recalculateEnemyFov() {
        this.enemyVision = [];

        this.actorList.filter(a => !(a instanceof Player)).forEach(
            a => this.fov.compute180(a.position.x, a.position.y, a.sightRadius, a.direction, (x, y) => {
                const index = this.xyToIndex(x, y);
                // this way the walls aren't colored and player doesn't know
                // that there is enemy on the other side
                this.enemyVision[index] = this.tileArray[index].passable;
            })
        );
    }

    tryLookAt(x: number, y: number) {
        const index = this.xyToIndex(x, y);
        if (this.visibilityMask[index]) {
            return this.tileArray[index].name;
        }
    }

    tryPickUp(player: Player): string {
        const index = this.positionToIndex(player.position);
        const thing = this.itemsList.get(index);
        if (typeof thing !== 'undefined') {
            const pickUpSuccess = player.inventory.addItem(thing);
            if (pickUpSuccess) {
                this.itemsList.delete(index);
                return `You have picked up ${thing.name}`;
            } else {
                return `You have no space in inventory to pick ${thing.name} up!`;
            }
        } else {
            return `There is nothing here!`;
        }
    }

    positionToIndex(position: GamePosition) {
        return this.width * position.y + position.x;
    }

    tileInPosition(position: GamePosition) {
        return this.tileArray[this.positionToIndex(position)];
    }

    interactAt(position: GamePosition, actor: Actor): { success: boolean, msg?: string } {
        const index = this.positionToIndex(position);

        const interactFunc = this.tileArray[index].interact;

        if (typeof interactFunc !== 'function') {
            return { success: false };
        }

        const command = interactFunc(actor, this);

        if (command.type !== 'tile-transformation' || !command.payload) {
            return { success: false };
        }

        this.tileArray[index] = command.payload;

        this.recalculatePlayerFov();
        this.recalculateEnemyFov();

        return { success: true, msg: command.msg };
    }

    actorAt(position: GamePosition): Actor | undefined {
        return this.actorList.find(a => a.position.x === position.x && a.position.y === position.y);
    }

    private xyToIndex(x: number, y: number) {
        return this.width * y + x;
    }
}

export interface IInteractionCommand {
    type: "tile-transformation" | "null";
    payload: IMapTile | null;
    msg?: string;
}

export interface IMapTile {
    name: string;
    description: string;
    tile: Tile;
    passable: boolean;
    transparent: boolean;
    interact?: (actor: Actor, map: GameMap) => IInteractionCommand;
    pathable?: (actor: Actor) => boolean;
}
