import { Scheduler, Engine } from 'rot-js';
import { displayConstants, initDisplay } from './display';
import { Player } from './player';

const scheduler = new Scheduler.Simple();
const engine = new Engine(scheduler);

const player = new Player(
    displayConstants.mainAreaWidth / 2,
    displayConstants.mainAreaHeight / 2,
    engine);

scheduler.add(player, true);

const { gameDisplay, messageDisplay } = initDisplay();

window.onload = () => {
    // main loop
    window.setInterval(() => {
        gameDisplay.clear();
        gameDisplay.draw(player.appearance.x, player.appearance.y, '@', '#fff', '#000');
        messageDisplay.drawText(2, 2, 'Hello world!', 75);
    }, 50);

    engine.start();
};
