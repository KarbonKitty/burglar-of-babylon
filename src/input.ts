import { Player } from "./player";
import { GameMap } from "./map";

import { KEYS } from "rot-js";

const handleInput = (e: KeyboardEvent, player: Player, map: GameMap) => {
    if (!player.isPlayerTurn) {
        return;
    }

    switch (e.keyCode) {
        case KEYS.VK_UP:
            if (map.isPositionAvailable(player.appearance.x, player.appearance.y - 1)) {
                player.appearance.y -= 1;
                player.stopAct();
            }
            break;
        case KEYS.VK_DOWN:
            if (map.isPositionAvailable(player.appearance.x, player.appearance.y + 1)) {
                player.appearance.y += 1;
                player.stopAct();
            }
            break;
        case KEYS.VK_LEFT:
            if (map.isPositionAvailable(player.appearance.x - 1, player.appearance.y)) {
                player.appearance.x -= 1;
                player.stopAct();
            }
            break;
        case KEYS.VK_RIGHT:
            if (map.isPositionAvailable(player.appearance.x + 1, player.appearance.y)) {
                player.appearance.x += 1;
                player.stopAct();
            }
            break;
    }
}

export default handleInput;
