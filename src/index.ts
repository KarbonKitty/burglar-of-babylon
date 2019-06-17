import { Display, KEYS } from 'rot-js';

const displayConstants = {
    mainAreaWidth: 60,
    mainAreaHeight: 60,
    textAreaWidth: 80,
    textAreaHeight: 60,
    fontSize: 13
};

const gameDisplay = new Display({
    width: displayConstants.mainAreaWidth,
    height: displayConstants.mainAreaHeight,
    forceSquareRatio: true,
    fontSize: displayConstants.fontSize,
    fontFamily: "arial"
});

const messageDisplay = new Display({
    width: displayConstants.textAreaWidth,
    height: displayConstants.textAreaHeight,
    fontSize: displayConstants.fontSize
});

const gameContainer = gameDisplay.getContainer()!;
const messageContainer = messageDisplay.getContainer()!;

const leftDiv = document.getElementById("left")!;
const rightDiv = document.getElementById("right")!;
leftDiv.appendChild(gameContainer);
rightDiv.appendChild(messageContainer);

const playerData = {
    x: displayConstants.mainAreaWidth / 2,
    y: displayConstants.mainAreaHeight / 2
};

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
