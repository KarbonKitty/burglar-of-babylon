import { Player } from "./actors/player";
import { GameMap } from "./map";
import { GamePosition } from "./position";
import { KEYS } from "rot-js";

export const handleInput = (e: KeyboardEvent, player: Player, map: GameMap) => {
    if (!player.isPlayerTurn) {
        return;
    }

    switch (state) {
        case "general":
            handleGeneralKeys(e, player, map);
            return;
        case "use-in-direction":
            useInDirection(e, player, map);
            return;
        case "use-from-inventory":
            useFromInventory(e, player, map);
            return;
    }
};

function useInPosition(position: GamePosition, player: Player, map: GameMap) {
    const interactionSuccesful = interactInPosition(position, player, map);

    if (interactionSuccesful) {
        player.stopAct();
    }
}

function useFromInventory(e: KeyboardEvent, player: Player, map: GameMap) {
    const num = numberFromKey(e.keyCode);

    if (num > 0) {
        // table starts at zero, and inventory starts at 1
        player.inventory.items[num - 1].use(player);
        state = "general";
        player.stopAct();
    }
}

let actionSlot: (position: GamePosition, player: Player, map: GameMap) => void;

type InputState = "general" | "use-in-direction" | "use-from-inventory";

let state: InputState = 'general';

function useInDirection(e: KeyboardEvent, player: Player, map: GameMap) {
    const direction = keyToDirection(player.position, e.keyCode);

    if (direction !== null) {
        actionSlot(direction, player, map);
        state = "general";
    }
}

function handleGeneralKeys(e: KeyboardEvent, player: Player, map: GameMap) {
    const direction = keyToDirection(player.position, e.keyCode);
    if (direction !== null) {
        handleMove(player, map, direction);
    } else {
        switch (e.keyCode) {
            case KEYS.VK_SPACE:
                player.stopAct();
                break;
            case KEYS.VK_U:
                state = "use-in-direction";
                actionSlot = useInPosition;
                break;
            case KEYS.VK_I:
                player.displayInventory();
                state = "use-from-inventory";
                break;
        }
    }
}

function handleMove(player: Player, map: GameMap, newPosition: GamePosition) {
    const moveSuccessful = tryMoveTo(player, map, newPosition);
    if (moveSuccessful) {
        player.stopAct();
    }
}

function tryMoveTo(player: Player, map: GameMap, newPosition: GamePosition) {
    if (map.isPositionAvailable(newPosition)) {
        player.position = newPosition;
        // TODO: variable sight radius
        map.recalculateFov(newPosition, 10);
        return true;
    } else {
        return interactInPosition(newPosition, player, map);
    }
}

function interactInPosition(position: GamePosition, player: Player, map: GameMap) {
    const mapIndex = map.positionToIndex(position);

    const interactFunc = map.tileArray[mapIndex].interact;
    if (typeof interactFunc === 'function') {
        const command = interactFunc(player, map);
        if (command.type === 'tile-transformation' && command.payload) {
            map.tileArray[mapIndex] = command.payload;
            map.recalculateFov(player.position, 10);
            return true;
        }
    }

    return false;
}

function keyToDirection(oldPosition: GamePosition, keyCode: number): GamePosition | null {
    switch (keyCode) {
        case KEYS.VK_UP:
            return oldPosition.north;
        case KEYS.VK_DOWN:
            return oldPosition.south;
        case KEYS.VK_LEFT:
            return oldPosition.west;
        case KEYS.VK_RIGHT:
            return oldPosition.east;
        default:
            return null;
    }
}

function numberFromKey(keyCode: number) {
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
