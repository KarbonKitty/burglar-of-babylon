import { Player } from "./actors/player";
import { GameMap } from "./map";

import { KEYS } from "rot-js";
import { GamePosition } from "./position";

export const handleInput = (e: KeyboardEvent, player: Player, map: GameMap) => {
    if (!player.isPlayerTurn) {
        return;
    }

    let newPosition: GamePosition | undefined;

    switch (e.keyCode) {
        case KEYS.VK_UP:
            newPosition = player.position.north;
            break;
        case KEYS.VK_DOWN:
            newPosition = player.position.south;
            break;
        case KEYS.VK_LEFT:
            newPosition = player.position.west;
            break;
        case KEYS.VK_RIGHT:
            newPosition = player.position.east;
            break;
        case KEYS.VK_SPACE:
            player.stopAct();
            break;
    }

    if (typeof newPosition !== 'undefined') {
        const moveSuccessful = tryMoveTo(player, map, newPosition);
        if (moveSuccessful) {
            player.stopAct();
        }
    }
};

function tryMoveTo(player: Player, map: GameMap, newPosition: GamePosition) {
    if (map.isPositionAvailable(newPosition)) {
        player.position = newPosition;
        // TODO: variable sight radius
        map.recalculateFov(newPosition, 10);
        return true;
    } else {
        const interactFunc = map.tileArray[map.positionToIndex(newPosition)].interact;
        if (typeof interactFunc === 'function') {
            const command = interactFunc(player, map);
            if (command.type === 'tile-transformation' && command.payload) {
                map.tileArray[map.positionToIndex(newPosition)] = command.payload;
                map.recalculateFov(player.position, 10);
                return true;
            }
        }
    }

    return false;
}
