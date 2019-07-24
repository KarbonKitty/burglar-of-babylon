import { DisplayManager } from './display';
import { Player } from './actors/player';
import { NPC } from './actors/NPC';
import { GameMap } from './map';
import { map as officeMap } from './data/office';
import { GameManager } from './gameManager';
import { items } from './data/items';
import { GamePosition } from './position';
import { Item } from './items/item';
import { Patrol } from './actors/ai';

const displayManager = new DisplayManager();
const office = new GameMap('office', officeMap);
const player = new Player("Johnny", 58, 58);

const gameManager = new GameManager(player, office, displayManager);

const guardTile = { glyph: "G", color: "#f00" };

const guards = [
    new NPC("Guard", guardTile, 5, 23, 4, new Patrol(new GamePosition(5, 23), new GamePosition(5, 38))),
    new NPC("Guard", guardTile, 1, 42, 4, new Patrol(new GamePosition(1, 42), new GamePosition(19, 58))),
    new NPC("Guard", guardTile, 31, 50, 4, new Patrol(new GamePosition(31, 50), new GamePosition(51, 30))),
    new NPC("Guard", guardTile, 22, 10, 4, new Patrol(new GamePosition(22, 10), new GamePosition(51, 30))),
];

office.itemsList.set(office.positionToIndex(new GamePosition(56, 56)), new Item(items.stunGun));

office.itemsList.set(office.positionToIndex(new GamePosition(40, 40)), new Item(items.signalJammer));
office.itemsList.set(office.positionToIndex(new GamePosition(57, 19)), new Item(items.signalJammer));
office.itemsList.set(office.positionToIndex(new GamePosition(58, 2)), new Item(items.signalJammer));
office.itemsList.set(office.positionToIndex(new GamePosition(19, 58)), new Item(items.signalJammer));

office.itemsList.set(office.positionToIndex(new GamePosition(25, 5)), new Item(items.keycard));

gameManager.registerActor(guards[0]);
gameManager.registerActor(guards[1]);
gameManager.registerActor(guards[2]);
gameManager.registerActor(guards[3]);

window.onload = () => {
    gameManager.runMap();
};
