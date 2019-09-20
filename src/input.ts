import { Player } from "./actors/player";
import { GameMap } from "./map";
import { GamePosition } from "./position";
import { KEYS } from "rot-js";
import { DisplayManager } from "./display";

type InputState = "general" | "use-in-direction" | "use-from-inventory" | "get-direction";

class InputManager {
    private _state: InputState;

    private _awaiter: (value?: GamePosition | PromiseLike<GamePosition> | undefined) => void;
    private actionSlot: (player: Player, map: GameMap, position: GamePosition, displayManager: DisplayManager) => void;

    constructor() {
        this._state = "general";

        this._awaiter = () => { return; };
        this.actionSlot = () => { return; };
    }

    handleInput(player: Player, map: GameMap, displayManager: DisplayManager, e: KeyboardEvent) {
        if (!player.isPlayerTurn) {
            return;
        }

        if (player.conditions.find(c => c.type === 'stunned')) {
            displayManager.addMessage(`You are helpless!`);
            player.stopAct();
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
                this.useFromInventory(e, player, map, displayManager);
                return;
            case "get-direction":
                const dir = this.keyToDirection(player.position, e.keyCode);
                if (dir !== null) {
                    this._awaiter(dir);
                }
                return;
        }
    }

    async getDirection(): Promise<GamePosition> {
        this._state = "get-direction";
        const p = new Promise<GamePosition>(resolve => this._awaiter = resolve);
        const dir = await p;
        return dir;
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
            map.recalculatePlayerFov();
            return true;
        } else {
            return this.interactInPosition(player, map, newPosition, displayManager);
        }
    }

    private interactInPosition(player: Player, map: GameMap, position: GamePosition, displayManager: DisplayManager) {
        const result = map.interactAt(position, player);

        if (result.msg) {
            displayManager.addMessage(result.msg);
        }

        return result.success;
    }

    private handleGeneralKeys(e: KeyboardEvent, player: Player, map: GameMap, displayManager: DisplayManager) {
        const direction = this.keyToDirection(player.position, e.keyCode);
        if (direction !== null) {
            this.handleMove(player, map, direction, displayManager);
        } else {
            switch (e.keyCode) {
                case KEYS.VK_SPACE:
                case KEYS.VK_NUMPAD5:
                    player.stopAct();
                    break;
                case KEYS.VK_F:
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
                case KEYS.VK_0:
                    displayManager.displayDebugInfo();
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

    private async useFromInventory(e: KeyboardEvent, player: Player, map: GameMap, displayManager: DisplayManager) {
        const num = this.numberFromKey(e.keyCode);

        if (num === -1) {
            this._state = "general";
            displayManager.drawMessages();
            return;
        }

        const result = await player.inventory.useItem(num - 1, player, map);

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
            case KEYS.VK_NUMPAD8:
                return oldPosition.north;
            case KEYS.VK_DOWN:
            case KEYS.VK_X:
            case KEYS.VK_J:
            case KEYS.VK_NUMPAD2:
                return oldPosition.south;
            case KEYS.VK_LEFT:
            case KEYS.VK_A:
            case KEYS.VK_H:
            case KEYS.VK_NUMPAD4:
                return oldPosition.west;
            case KEYS.VK_RIGHT:
            case KEYS.VK_D:
            case KEYS.VK_L:
            case KEYS.VK_NUMPAD6:
                return oldPosition.east;
            case KEYS.VK_NUMPAD7:
            case KEYS.VK_Q:
            case KEYS.VK_Y:
                return oldPosition.northwest;
            case KEYS.VK_NUMPAD9:
            case KEYS.VK_E:
            case KEYS.VK_U:
                return oldPosition.northeast;
            case KEYS.VK_NUMPAD3:
            case KEYS.VK_C:
            case KEYS.VK_N:
                return oldPosition.southeast;
            case KEYS.VK_NUMPAD1:
            case KEYS.VK_Z:
            case KEYS.VK_B:
                return oldPosition.southwest;
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
