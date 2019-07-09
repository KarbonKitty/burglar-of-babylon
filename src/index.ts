import { Scheduler } from 'rot-js';
import { DisplayManager } from './display';
import { Player } from './actors/player';
import { NPC } from './actors/NPC';
import { GameMap } from './map';
import { map as officeMap } from './data/office';
import { handleInput } from './input';
import { GameEngine } from './engine';
import { wander } from './actors/ai';
import { Actor } from './actors/actor';

const scheduler = new Scheduler.Simple();
const office = new GameMap(officeMap);
const engine = new GameEngine(scheduler, office);
const displayManager = new DisplayManager();

function registerActor(actor: Actor) {
    scheduler.add(actor, true);
    office.actorList.push(actor);
}

const guardTile = { glyph: "G", color: "#f00" };

const player = new Player("Johnny", 58, 58);
const guards = [
    new NPC(guardTile, 21, 16, wander),
    new NPC(guardTile, 18, 50, wander),
    new NPC(guardTile, 6, 24, wander),
    new NPC(guardTile, 50, 30, wander)];

registerActor(player);
registerActor(guards[0]);
registerActor(guards[1]);
registerActor(guards[2]);
registerActor(guards[3]);

const redraw = (player: Player) => {
    displayManager.gameDisplay.clear();
    displayManager.drawMap(office);
    displayManager.drawInterface(player);
}

window.onload = () => {
    // first draw
    // TODO: variable sight radius
    office.recalculateFov(player.position, 10);
    office.recalculateEnemyFov();
    displayManager.drawInterface(player);
    displayManager.addMessage("Hello world!");
    redraw(player);

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
    engine.start(redraw.bind(null, player));
};
