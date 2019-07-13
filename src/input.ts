import { Player } from "./actors/player";
import { GameMap } from "./map";
import { GamePosition } from "./position";
import { KEYS } from "rot-js";
import { DisplayManager } from "./display";

type InputState = "general" | "use-in-direction" | "use-from-inventory";

export class InputManager {
    private _player: Player;
    private _map: GameMap;
    private _displayManager: DisplayManager;
    private _state: InputState;

    private actionSlot: (position: GamePosition) => void;

    constructor(player: Player, map: GameMap, displayManager: DisplayManager) {
        this._player = player;
        this._map = map;
        this._displayManager = displayManager;

        this._state = "general";

        this.actionSlot = () => { return; };
    }

    handleInput(e: KeyboardEvent) {
        if (!this._player.isPlayerTurn) {
            return;
        }

        switch (this._state) {
            case "general":
                this.handleGeneralKeys(e);
                return;
            case "use-in-direction":
                this.useInDirection(e);
                return;
            case "use-from-inventory":
                this.useFromInventory(e);
                return;
        }
    }

    private handleMove(newPosition: GamePosition) {
        const moveSuccessful = this.tryMoveTo(newPosition);
        if (moveSuccessful) {
            this._player.stopAct();
        }
    }

    private tryMoveTo(newPosition: GamePosition) {
        if (this._map.isPositionAvailable(newPosition)) {
            this._player.position = newPosition;
            // TODO: variable sight radius
            this._map.recalculateFov(newPosition, 10);
            return true;
        } else {
            return this.interactInPosition(newPosition);
        }
    }

    private interactInPosition(position: GamePosition) {
        const mapIndex = this._map.positionToIndex(position);

        const interactFunc = this._map.tileArray[mapIndex].interact;
        if (typeof interactFunc === 'function') {
            const command = interactFunc(this._player, this._map);
            if (command.type === 'tile-transformation' && command.payload) {
                this._map.tileArray[mapIndex] = command.payload;
                this._map.recalculateFov(this._player.position, 10);
                if (command.msg) {
                    this._displayManager.addMessage(command.msg);
                }
                return true;
            }
        }

        return false;
    }

    private handleGeneralKeys(e: KeyboardEvent) {
        const direction = this.keyToDirection(this._player.position, e.keyCode);
        if (direction !== null) {
            this.handleMove(direction);
        } else {
            switch (e.keyCode) {
                case KEYS.VK_SPACE:
                    this._player.stopAct();
                    break;
                case KEYS.VK_U:
                    this._displayManager.addTemporaryMessage("Please select direction");
                    this._state = "use-in-direction";
                    this.actionSlot = this.useInPosition;
                    break;
                case KEYS.VK_I:
                    this._displayManager.addTemporaryMessage(
                        "Please select an item to use (press corresponding number)");
                    this._state = "use-from-inventory";
                    break;
            }
        }
    }

    private useInDirection(e: KeyboardEvent) {
        const direction = this.keyToDirection(this._player.position, e.keyCode);

        if (direction !== null) {
            this.actionSlot(direction);
            this._state = "general";
            this._displayManager.drawMessages();
        }
    }

    private useFromInventory(e: KeyboardEvent) {
        const num = this.numberFromKey(e.keyCode);

        if (num === -1) {
            this._state = "general";
            this._displayManager.drawMessages();
            return;
        }

        const thing = this._player.inventory.items[num - 1];

        if (typeof thing !== 'undefined') {
            // table starts at zero, and inventory starts at 1
            const msg = thing.use(this._player);
            this._displayManager.addMessage(msg);
            this._state = "general";
            this._displayManager.drawMessages();
            this._player.stopAct();
        }
    }

    private useInPosition(position: GamePosition) {
        const interactionSuccesful = this.interactInPosition(position);

        if (interactionSuccesful) {
            this._player.stopAct();
        }
    }

    private keyToDirection(oldPosition: GamePosition, keyCode: number): GamePosition | null {
        switch (keyCode) {
            case KEYS.VK_UP:
            case KEYS.VK_W:
            case KEYS.VK_K:
                return oldPosition.north;
            case KEYS.VK_DOWN:
            case KEYS.VK_S:
            case KEYS.VK_J:
                return oldPosition.south;
            case KEYS.VK_LEFT:
            case KEYS.VK_A:
            case KEYS.VK_H:
                return oldPosition.west;
            case KEYS.VK_RIGHT:
            case KEYS.VK_D:
            case KEYS.VK_L:
                return oldPosition.east;
            default:
                return null;
        }
    }

    private numberFromKey(keyCode: number) {
        switch (keyCode) {
            case KEYS.VK_0:
                return 0;
            case KEYS.VK_1:
                return 1;
            case KEYS.VK_2:
                return 2;
            case KEYS.VK_3:
                return 3;
            case KEYS.VK_4:
                return 4;
            case KEYS.VK_5:
                return 5;
            case KEYS.VK_6:
                return 6;
            case KEYS.VK_7:
                return 7;
            case KEYS.VK_8:
                return 8;
            case KEYS.VK_9:
                return 9;
            default:
                return -1;
        }
    }
}
