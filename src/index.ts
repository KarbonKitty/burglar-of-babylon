import { Display } from 'rot-js';

const gameDisplay = new Display({ width: 60, height: 60, forceSquareRatio: true, fontSize: 13 });
const messageDisplay = new Display({ width: 80, height: 60, fontSize: 13}); 

const gameContainer = gameDisplay.getContainer()!;
const messageContainer = messageDisplay.getContainer()!;

const leftDiv = document.getElementById("left")!;
const rightDiv = document.getElementById("right")!;
leftDiv.appendChild(gameContainer);
rightDiv.appendChild(messageContainer);

gameDisplay.draw(30, 30, '@', '#fff', '#000');
messageDisplay.drawText(2, 2, 'Hello world!', 75);
