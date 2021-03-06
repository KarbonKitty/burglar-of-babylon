import { IMapTile, IInteractionCommand } from "../map";
import { Actor } from "../actors/actor";
import { items } from "./items";

/* tslint:disable:max-line-length */

const openDoor = () => ({ type: "tile-transformation", payload: tiles.openDoor, msg: "The door has been opened" }) as IInteractionCommand;
const closeDoor = () => ({ type: "tile-transformation", payload: tiles.door, msg: "The door has been closed" }) as IInteractionCommand;
const openSecureDoor = (actor: Actor): IInteractionCommand => {
    if (actor.inventory.checkForItem("keycard")) {
        return { type: 'tile-transformation', payload: tiles.openSecureDoor, msg: "The security door has been opened with a keycard" };
    } else {
        return { type: 'null', msg: "Security door can only be opened with keycard!" };
    }
};
const closeSecureDoor = () => ({ type: 'tile-transformation', payload: tiles.secureDoor, msg: "The security door has been closed and locked" }) as IInteractionCommand;
const hackMainframe = () => ({ type: 'item-creation', payload: items.data, msg: "You have retrieved data from the mainframe!" }) as IInteractionCommand;
const escape = (actor: Actor): IInteractionCommand => {
    if (actor.inventory.checkForItem("data")) {
        return { type: 'null', msg: "You have succesfully escaped with the data! The winner is you!" };
    } else {
        return { type: 'null', msg: "You better get the data first!" };
    }
}

const tiles: { [index: string]: IMapTile } = {
    floor: { name: "floor", description: "floor description", tile: { glyph: "⋅", color: "#ccf" }, passable: true, transparent: true },
    wall: { name: "wall", description: "wall description", tile: { glyph: '#', color: '#ccc' }, passable: false, transparent: false },
    bed: { name: "bed", description: "just a bed", tile: { glyph: "=", color: "#ccf" }, passable: true, transparent: true },
    door: { name: "door", description: "door desc", tile: { glyph: "+", color: "#ccf" }, passable: false, transparent: false, interact: openDoor, pathable: () => true },
    openDoor: { name: "open door", description: "open door", tile: { glyph: "/", color: "#ccf" }, passable: true, transparent: true, interact: closeDoor },
    secureDoor: { name: "secure door", description: "secure door", tile: { glyph: "±", color: "#ccf" }, passable: false, transparent: false, interact: openSecureDoor },
    openSecureDoor: { name: "open secure door", description: "open secure door", tile: { glyph: "/", color: "#ccf" }, passable: true, transparent: true, interact: closeSecureDoor },
    table: { name: "table", description: "table description", tile: { glyph: "τ", color: "#ccf" }, passable: false, transparent: true },
    chair: { name: "chair", description: "chair description", tile: { glyph: "ל", color: "#ccf" }, passable: true, transparent: true },
    sink: { name: "sink", description: "sink", tile: { glyph: "º", color: "#fff" }, passable: true, transparent: true },
    toilet: { name: "toilet", description: "toilet", tile: { glyph: "þ", color: "#ffc" }, passable: true, transparent: true },
    shower: { name: "shower", description: "shower", tile: { glyph: "√", color: "#aaf" }, passable: true, transparent: false },
    closet: { name: "closet", description: "closet", tile: { glyph: "≠", color: "#ccc" }, passable: false, transparent: false },
    counter: { name: "counter", description: "counter", tile: { glyph: "τ", color: "#ccf" }, passable: false, transparent: true },
    nightstand: { name: "nightstand", description: "nightstand", tile: { glyph: "π", color: "#ccf" }, passable: false, transparent: true },
    openAir: { name: "open air", description: "open air", tile: { glyph: " ", color: "#aaa" }, passable: false, transparent: true },
    stairsDown: { name: "stairs down", description: "stairs down", tile: { glyph: ">", color: "#fff" }, passable: true, transparent: true },
    stairsUp: { name: "stairs up", description: "stairs up", tile: { glyph: "<", color: "#ccf" }, passable: true, transparent: true },
    elevatorFloor: { name: "elevator floor", description: "elevator floor", tile: { glyph: "_", color: "#ddd" }, passable: true, transparent: true, interact: escape },
    officeChair: { name: "office chair", description: "office chair", tile: { glyph: "ከ", color: "#fff" }, passable: true, transparent: true },
    officeDesk: { name: "office desk", description: "office desk", tile: { glyph: "Π", color: "#fff" }, passable: false, transparent: true },
    officeCabinet: { name: "office storage cabinet", description: "office storage cabinet", tile: { glyph: "≠", color: "#fff" }, passable: false, transparent: false },
    mainframe: { name: "mainframe", description: "mission target", tile: { glyph: "Ѫ", color: "#fff" }, passable: false, transparent: false, interact: hackMainframe },
    lowDoor: { name: "low door", description: "low door", tile: { glyph: "₊", color: "#ccf" }, passable: false, transparent: true },
    bookcase: { name: "bookcase", description: "bookcase", tile: { glyph: "Ξ", color: "#cff" }, passable: false, transparent: false },
    pottedPlant: { name: "office plant", description: "office plant", tile: { glyph: "♠", color: "#0f0" }, passable: false, transparent: true },
    serverRack: { name: "server rack", description: "server rack", tile: { glyph: "ʭ", color: "#ccc" }, passable: false, transparent: false }
};

/* tslint:enable:max-line-length */

const mapTiles: Map<string, IMapTile> = new Map<string, IMapTile>();
mapTiles.set(".", tiles.floor );
mapTiles.set("#", tiles.wall);
mapTiles.set("=", tiles.bed);
mapTiles.set("+", tiles.door);
mapTiles.set("T", tiles.table);
mapTiles.set("ל", tiles.chair);
mapTiles.set("º", tiles.sink);
mapTiles.set("þ", tiles.toilet);
mapTiles.set("√", tiles.shower);
mapTiles.set("≠", tiles.closet);
mapTiles.set("τ", tiles.counter);
mapTiles.set("π", tiles.nightstand);
mapTiles.set(" ", tiles.openAir);
mapTiles.set(">", tiles.stairsDown);
mapTiles.set("<", tiles.stairsUp);
mapTiles.set("/", tiles.openDoor);
mapTiles.set("_", tiles.elevatorFloor);
mapTiles.set("±", tiles.secureDoor);
mapTiles.set("ከ", tiles.officeChair);
mapTiles.set("Π", tiles.officeDesk);
mapTiles.set("C", tiles.officeCabinet);
mapTiles.set("Ѫ", tiles.mainframe);
mapTiles.set("₊", tiles.lowDoor);
mapTiles.set("Ξ", tiles.bookcase);
mapTiles.set("♠", tiles.pottedPlant);
mapTiles.set("ʭ", tiles.serverRack);

export { mapTiles };
