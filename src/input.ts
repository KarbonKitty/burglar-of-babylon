import { Player } from "./actors/player";
import { GameMap } from "./map";
import { GamePosition } from "./position";
import { KEYS } from "rot-js";
import { DisplayManager } from "./display";

type InputState = "general" | "use-in-direction" | "use-from-inventory";

class InputManager {
    private _state: InputState;

    private actionSlot: (player: Player, map: GameMap, position: GamePosition, displayManager: DisplayManager) => void;

    constructor() {
        this._state = "general";

        this.actionSlot = () => { return; };
    }

    handleInput(player: Player, map: GameMap, displayManager: DisplayManager, e: KeyboardEvent) {
        if (!player.isPlayerTurn) {
            return;
        }

        switch (this._state) {
            case "general":
                this.handleGeneralKeys(e, player, map, displayManager);
                return;
            case "use-in-direction":
                this.useInDirection(e, player, map, displayManager);
                return;
            case "use-from-inventory":
                this.useFromInventory(e, player, displayManager);
                return;
        }
    }

    private handleMove(player: Player, map: GameMap, newPosition: GamePosition, displayManager: DisplayManager) {
        const moveSuccessful = this.tryMoveTo(player, map, newPosition, displayManager);
        if (moveSuccessful) {
            player.stopAct();
        }
    }

    private tryMoveTo(player: Player, map: GameMap, newPosition: GamePosition, displayManager: DisplayManager) {
        if (map.isPositionAvailable(newPosition)) {
            player.position = newPosition;
            map.recalculateFov(newPosition, player.sightRadius);
            return true;
        } else {
            return this.interactInPosition(player, map, newPosition, displayManager);
        }
    }

    private interactInPosition(player: Player, map: GameMap, position: GamePosition, displayManager: DisplayManager) {
        const mapIndex = map.positionToIndex(position);

        const interactFunc = map.tileArray[mapIndex].interact;
        if (typeof interactFunc === 'function') {
            const command = interactFunc(player, map);
            if (command.type === 'tile-transformation' && command.payload) {
                map.tileArray[mapIndex] = command.payload;
                map.recalculateFov(player.position, player.sightRadius);
                if (command.msg) {
                    displayManager.addMessage(command.msg);
                }
                return true;
            }
        }

        return false;
    }

    private handleGeneralKeys(e: KeyboardEvent, player: Player, map: GameMap, displayManager: DisplayManager) {
        const direction = this.keyToDirection(player.position, e.keyCode);
        if (direction !== null) {
            this.handleMove(player, map, direction, displayManager);
        } else {
            switch (e.keyCode) {
                case KEYS.VK_SPACE:
                    player.stopAct();
                    break;
                case KEYS.VK_U:
                    displayManager.addTemporaryMessage("Please select direction");
                    this._state = "use-in-direction";
                    this.actionSlot = this.useInPosition;
                    break;
                case KEYS.VK_I:
                    displayManager.addTemporaryMessage(
                        "Please select an item to use (press corresponding number)");
                    this._state = "use-from-inventory";
                    break;
                case KEYS.VK_G:
                    const msg = map.tryPickUp(player);
                    displayManager.addMessage(msg);
                    displayManager.drawInterface(player);
                    break;
                case KEYS.VK_P:
                    displayManager.showHelp();
                    break;
            }
        }
    }

    private useInDirection(e: KeyboardEvent, player: Player, map: GameMap, displayManager: DisplayManager) {
        const direction = this.keyToDirection(player.position, e.keyCode);

        if (direction !== null) {
            this.actionSlot(player, map, direction, displayManager);
            this._state = "general";
            displayManager.drawMessages();
        }
    }

    private useFromInventory(e: KeyboardEvent, player: Player, displayManager: DisplayManager) {
        const num = this.numberFromKey(e.keyCode);

        if (num === -1) {
            this._state = "general";
            displayManager.drawMessages();
            return;
        }

        const result = player.inventory.useItem(num - 1, player);

        if (result !== null) {
            displayManager.addMessage(result);
            this._state = "general";
            displayManager.drawMessages();
            player.stopAct();
        }
    }

    private useInPosition(player: Player, map: GameMap, position: GamePosition, displayManager: DisplayManager) {
        const interactionSuccesful = this.interactInPosition(player, map, position, displayManager);

        if (interactionSuccesful) {
            player.stopAct();
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

export const inputManager = new InputManager();
