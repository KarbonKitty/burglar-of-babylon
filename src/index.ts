import { Scheduler, Engine } from 'rot-js';
import { DisplayManager } from './display';
import { Player } from './player';

const scheduler = new Scheduler.Simple();
const engine = new Engine(scheduler);
const displayManager = new DisplayManager();

const player = new Player(
    displayManager.mainAreaWidth / 2,
    displayManager.mainAreaHeight / 2,
    engine);

scheduler.add(player, true);

window.onload = () => {
    // main loop
    window.setInterval(() => {
        displayManager.gameDisplay.clear();
        displayManager.draw(player.appearance);
        displayManager.messageDisplay.drawText(2, 2, 'Hello world!', 75);
    }, 50);

    engine.start();
};
