import { DisplayManager } from './display';
import { Player } from './actors/player';
import { NPC } from './actors/NPC';
import { GameMap } from './map';
import { map as officeMap } from './data/office';
import { InputManager } from './input';
import { wander } from './actors/ai';
import { GameManager } from './gameManager';
import { items } from './data/items';
import { GamePosition } from './position';
import { Item } from './items/item';

const displayManager = new DisplayManager();
const office = new GameMap(officeMap);
const player = new Player("Johnny", 58, 58);
const inputManager = new InputManager(player, office, displayManager);

const gameManager = new GameManager(player, office, displayManager, inputManager);

const guardTile = { glyph: "G", color: "#f00" };

const guards = [
    new NPC(guardTile, 21, 16, 5, wander),
    new NPC(guardTile, 18, 50, 5, wander),
    new NPC(guardTile, 6, 24, 5, wander),
    new NPC(guardTile, 50, 30, 5, wander)];

office.itemsList.set(office.positionToIndex(new GamePosition(40, 40)), new Item(items.signalJammer));
office.itemsList.set(office.positionToIndex(new GamePosition(57, 19)), new Item(items.signalJammer));
office.itemsList.set(office.positionToIndex(new GamePosition(58, 2)), new Item(items.signalJammer));
office.itemsList.set(office.positionToIndex(new GamePosition(19, 58)), new Item(items.signalJammer));

gameManager.registerActor(guards[0]);
gameManager.registerActor(guards[1]);
gameManager.registerActor(guards[2]);
gameManager.registerActor(guards[3]);

window.onload = () => {
    gameManager.runMap();
};
