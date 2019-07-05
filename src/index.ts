import { Scheduler } from 'rot-js';
import { DisplayManager } from './display';
import { Player } from './actors/player';
import { NPC } from './actors/NPC';
import { GameMap } from './map';
import { map as officeMap } from './data/office';
import { handleInput } from './input';
import { GameEngine } from './engine';
import { wander } from './actors/ai';

const scheduler = new Scheduler.Simple();
const office = new GameMap(officeMap);
const engine = new GameEngine(scheduler, office);
const displayManager = new DisplayManager();

const guardTile = { glyph: "G", fgColor: "#f00", bgColor: "#000" };

const player = new Player(58, 58);
const guards = [new NPC(guardTile, 50, 58, wander), new NPC(guardTile, 49, 58, wander)];

scheduler.add(player, true);
scheduler.add(guards[0], true);
scheduler.add(guards[1], true);

office.actorList.push(player);
office.actorList.push(guards[0]);
office.actorList.push(guards[1]);

const redraw = () => {
    displayManager.gameDisplay.clear();
    displayManager.drawMap(office);
}

window.onload = () => {
    // first draw
    // TODO: variable sight radius
    office.recalculateFov(player.position, 10);
    office.recalculateEnemyFov();
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
