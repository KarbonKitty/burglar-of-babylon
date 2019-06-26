import { Scheduler, Engine } from 'rot-js';
import { DisplayManager } from './display';
import { Player } from './player';
import { TestNPC } from './testNPC';
import { GameMap } from './map';
import { map as floor38map } from './data/floor38';
import { handleInput } from './input';

const scheduler = new Scheduler.Simple();
const engine = new Engine(scheduler);
const displayManager = new DisplayManager();

const floor38 = new GameMap(floor38map);

const player = new Player(
    2,
    19,
    engine);

const testNPC = new TestNPC(
    displayManager.mainAreaWidth / 2 + 5,
    displayManager.mainAreaHeight / 2 + 5,
    floor38);

scheduler.add(player, true);
scheduler.add(testNPC, true);

floor38.actorList.push(player);
floor38.actorList.push(testNPC);

const drawCallback = () => {
    displayManager.gameDisplay.clear();
    displayManager.drawMap(floor38);
    displayManager.messageDisplay.drawText(2, 2, 'Hello world!', 75);
    requestAnimationFrame(drawCallback);
}

window.onload = () => {
    // draw loop
    requestAnimationFrame(drawCallback);

    // handle inputs
    addEventListener("keydown", e => handleInput(e, player, floor38));

    // main loop
    engine.start();
};
