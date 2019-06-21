import { Display } from 'rot-js';

export const displayConstants = {
    mainAreaWidth: 60,
    mainAreaHeight: 60,
    textAreaWidth: 80,
    textAreaHeight: 60,
    fontSize: 13
};

export function init() {
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

    return {
        gameDisplay,
        messageDisplay
    };
}
