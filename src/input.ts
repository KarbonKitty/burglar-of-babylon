import { Player } from "./player";

import { KEYS } from "rot-js";

const handleInput = (e: KeyboardEvent, player: Player) => {
    switch (e.keyCode) {
        case KEYS.VK_UP:
            player.appearance.y -= 1;
            player.stopAct();
            break;
        case KEYS.VK_DOWN:
            player.appearance.y += 1;
            player.stopAct();
            break;
        case KEYS.VK_LEFT:
            player.appearance.x -= 1;
            player.stopAct();
            break;
        case KEYS.VK_RIGHT:
            player.appearance.x += 1;
            player.stopAct();
            break;
    }
}

export default handleInput;
