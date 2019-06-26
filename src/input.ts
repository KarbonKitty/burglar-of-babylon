import { Player } from "./actors/player";
import { GameMap } from "./map";

import { KEYS } from "rot-js";
import { GamePosition } from "./position";

export const handleInput = (e: KeyboardEvent, player: Player, map: GameMap) => {
    if (!player.isPlayerTurn) {
        return;
    }

    let newPosition: GamePosition | undefined = undefined;

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
    }

    if (typeof newPosition !== 'undefined') {
        if (map.isPositionAvailable(newPosition)) {
            player.position = newPosition;
            // TODO: variable sight radius
            map.recalculateFov(newPosition, 10);
            player.stopAct();
        }
    }
}
