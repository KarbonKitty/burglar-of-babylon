import { Scheduler, Engine } from 'rot-js';
import { DisplayManager } from './display';
import { Player } from './player';
import { TestNPC } from './testNPC';
import { Actor } from './actor';

const scheduler = new Scheduler.Simple();
const engine = new Engine(scheduler);
const displayManager = new DisplayManager();
const actorList: Array<Actor> = [];

const player = new Player(
    displayManager.mainAreaWidth / 2,
    displayManager.mainAreaHeight / 2,
    engine);


const testNPC = new TestNPC(
    displayManager.mainAreaWidth / 2 + 5,
    displayManager.mainAreaHeight / 2 + 5);

scheduler.add(player, true);
actorList.push(player);
scheduler.add(testNPC, true);
actorList.push(testNPC);

const drawCallback = () => {
    displayManager.gameDisplay.clear();
    actorList.forEach(actor => displayManager.draw(actor.appearance));
    displayManager.messageDisplay.drawText(2, 2, 'Hello world!', 75);
    requestAnimationFrame(drawCallback);
}

window.onload = () => {
    // draw loop
    requestAnimationFrame(drawCallback);

    // main loop
    engine.start();
};
