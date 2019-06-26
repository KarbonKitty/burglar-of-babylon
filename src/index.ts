import { Scheduler } from 'rot-js';
import { DisplayManager } from './display';
import { Player } from './actors/player';
import { TestNPC } from './actors/testNPC';
import { GameMap } from './map';
import { map as floor38map } from './data/floor38';
import { handleInput } from './input';
import { GameEngine } from './engine';

const scheduler = new Scheduler.Simple();
const engine = new GameEngine(scheduler);
const displayManager = new DisplayManager();

const floor38 = new GameMap(floor38map);

const player = new Player(2, 19);

const testNPC = new TestNPC(
    displayManager.mainAreaWidth / 2 + 4,
    displayManager.mainAreaHeight / 2 + 5,
    floor38);

scheduler.add(player, true);
scheduler.add(testNPC, true);

floor38.actorList.push(player);
floor38.actorList.push(testNPC);

const redraw = () => {
    displayManager.gameDisplay.clear();
    displayManager.drawMap(floor38, player);
    displayManager.messageDisplay.drawText(2, 2, 'Hello world!', 75);
}

window.onload = () => {
    // first draw
    redraw();

    // handle inputs
    addEventListener("keydown", e => handleInput(e, player, floor38));

    // main loop
    engine.start(redraw);
};
