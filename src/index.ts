import { KEYS } from 'rot-js';
import { displayConstants, init as initializeDisplay } from './display';

const playerData = {
    x: displayConstants.mainAreaWidth / 2,
    y: displayConstants.mainAreaHeight / 2
};

const { gameDisplay, messageDisplay } = initializeDisplay();

window.onload = () => {
    // input handler
    window.addEventListener("keydown", e => {
        switch (e.keyCode) {
            case KEYS.VK_UP:
                playerData.y -= 1;
                break;
            case KEYS.VK_DOWN:
                playerData.y += 1;
                break;
            case KEYS.VK_LEFT:
                playerData.x -= 1;
                break;
            case KEYS.VK_RIGHT:
                playerData.x += 1;
                break;
        }
    });

    // main loop
    window.setInterval(() => {
        gameDisplay.clear();
        gameDisplay.draw(playerData.x, playerData.y, '@', '#fff', '#000');
        messageDisplay.drawText(2, 2, 'Hello world!', 75);
    }, 50);
};
