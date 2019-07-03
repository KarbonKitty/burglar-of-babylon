import { Scheduler } from 'rot-js';
import { DisplayManager } from './display';
import { Player } from './actors/player';
import { TestNPC } from './actors/testNPC';
import { GameMap } from './map';
import { map as officeMap } from './data/office';
import { handleInput } from './input';
import { GameEngine } from './engine';

const scheduler = new Scheduler.Simple();
const engine = new GameEngine(scheduler);
const displayManager = new DisplayManager();

const office = new GameMap(officeMap);

const player = new Player(58, 58);

const testNPC = new TestNPC(
    displayManager.mainAreaWidth / 4 - 4,
    displayManager.mainAreaHeight / 4 - 5,
    office);

scheduler.add(player, true);
scheduler.add(testNPC, true);

office.actorList.push(player);
office.actorList.push(testNPC);

const redraw = () => {
    displayManager.gameDisplay.clear();
    displayManager.drawMap(office);
}

window.onload = () => {
    // first draw
    // TODO: variable sight radius
    office.recalculateFov(player.position, 10);
    displayManager.addMessage("Hello world!");
    redraw();

    // handle inputs
    addEventListener("keydown", e => handleInput(e, player, office));

    addEventListener('mousedown', e => {
        const p = displayManager.gameDisplay.eventToPosition(e);
        const name = office.tryLookAt(p[0], p[1]);
        if (typeof name !== 'undefined') {
            displayManager.addMessage(`You see a ${name}.`);
        }
      });

    // main loop
    engine.start(redraw);
};
