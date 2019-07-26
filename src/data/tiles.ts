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

const tiles = {
    floor: { name: "floor", descriptions: { default: "Boring, old floor. It can double as a bed if you are desperate.", office: "Floor is covered in gray carpet designed to hide whatever dirt and grimes falls on it during long days and nights in the office. But it couldn't hide blood, so you just hope you won't leave any of yours here." }, tile: { glyph: "⋅", color: "#ccf" }, passable: true, transparent: true },
    wall: { name: "wall", descriptions: { default: "Boring, old wall. You can try propping it up if it seems tired.", office: "Walls are painted light gray, to complement the carpets. There are motiviational slogans and all kinds of corporate buzzwords every here and there. They are so boring it's hard to read more than one or two; eyes start glazing over them like over magic that muggles shouldn't see." }, tile: { glyph: '#', color: '#ccc' }, passable: false, transparent: false },
    bed: { name: "bed", descriptions: { default: "Boring, old bed. You can sleep on it, but that's probably everything you are will be able to remember five minutes after you get up." }, tile: { glyph: "=", color: "#ccf" }, passable: true, transparent: true },
    door: { name: "door", descriptions: { default: "Boring, old door. They open and they close; is there anything else you expected of the doors? They are closed now." }, tile: { glyph: "+", color: "#ccf" }, passable: false, transparent: false, interact: openDoor, pathable: () => true },
    openDoor: { name: "open door", descriptions: { default: "Boring, old door. They open and they close; is there anything else you expected of the doors? They are open now." }, tile: { glyph: "/", color: "#ccf" }, passable: true, transparent: true, interact: closeDoor },
    secureDoor: { name: "secure door", descriptions: { default: "Boring, old security door. They open, they close, and they lock. They don't look they like you. They are closed now." }, tile: { glyph: "±", color: "#ccf" }, passable: false, transparent: false, interact: openSecureDoor },
    openSecureDoor: { name: "open secure door", descriptions: { default: "Boring, old security door. They open, they close, and they lock. They don't look they like you. They are open now." }, tile: { glyph: "/", color: "#ccf" }, passable: true, transparent: true, interact: closeSecureDoor },
    table: { name: "table", descriptions: { default: "Boring, old table. Probably better not use it as a shield in a firefight; they don't stop bullets too well." }, tile: { glyph: "τ", color: "#ccf" }, passable: false, transparent: true },
    sink: { name: "sink", descriptions: { default: "Boring, old sink. You can wash your hands here, and they will probably end up cleaner than they started." }, tile: { glyph: "º", color: "#fff" }, passable: true, transparent: true },
    toilet: { name: "toilet", descriptions: { default: "Boring, old toilet. I trust that you are capable of using it and mature enough to understand the need to?" }, tile: { glyph: "þ", color: "#ffc" }, passable: true, transparent: true },
    shower: { name: "shower", descriptions: { default: "Boring, old shower. Using it every now and then really helps with the stealth, unless you are sneaking through a garbage dump." }, tile: { glyph: "√", color: "#aaf" }, passable: true, transparent: false },
    closet: { name: "closet", descriptions: { default: "Boring, old closet. A child could hide within, or a small person. Or a top half of a person? Maybe a skeleton?" }, tile: { glyph: "≠", color: "#ccc" }, passable: false, transparent: false },
    counter: { name: "counter", descriptions: { default: "Boring, old counter. You can probably set up a computer or microwave oven here, and perhaps even eat a lunch." }, tile: { glyph: "τ", color: "#ccf" }, passable: false, transparent: true },
    nightstand: { name: "nightstand", descriptions: { default: "Boring, old nightstand. There's probably an old copy Vratislavian Courier in one of the drawers, but is it even worth checking? Like, don't you have anything better to do?" }, tile: { glyph: "π", color: "#ccf" }, passable: false, transparent: true },
    openAir: { name: "open air", descriptions: { default: "Boring, old air. In this city, there is probably at least a twenty meter more of air under this little place you are looking at. Don't fall down." }, tile: { glyph: " ", color: "#aaa" }, passable: false, transparent: true },
    stairsDown: { name: "stairs down", descriptions: { default: "Boring, old stairs. Those lead down, a bit closer to earth. Or a bit deeper into it's bowels, as the case might be." }, tile: { glyph: ">", color: "#fff" }, passable: true, transparent: true },
    stairsUp: { name: "stairs up", descriptions: { default: "Boring, old stairs. Those lead up - a bit closer to the heaven, or a bit closer to the surface." }, tile: { glyph: "<", color: "#ccf" }, passable: true, transparent: true },
    elevatorFloor: { name: "elevator floor", descriptions: { default: "Boring, old elevator floor. Covered with PVC in the grey and muddy brown, to hide the fact people do, in fact, manage to get dirt on their shoes even in this city." }, tile: { glyph: "_", color: "#ddd" }, passable: true, transparent: true, interact: escape },
    chair: { name: "char", descriptions: { default: "Boring, old chair. For some inexplicable reason, those are still made out of dead trees, instead of plastic, like most things nowadays." }, tile: { glyph: "ከ", color: "#fff" }, passable: true, transparent: true },
    desk: { name: "desk", descriptions: { default: "Boring, old desk. Best place to hide in the event of earthquake or an active shooter on scene. Both seem to have grown more common in the last decade or two." }, tile: { glyph: "Π", color: "#fff" }, passable: false, transparent: true },
    mainframe: { name: "mainframe", descriptions: { default: "Boring, old mainframe. It was quite a powerful computer in it's time, but, well, old doesn't play nice with computers." }, tile: { glyph: "Ѫ", color: "#fff" }, passable: false, transparent: false, interact: hackMainframe },
    lowDoor: { name: "low door", descriptions: { default: "Boring, old door. They are only waist-high, so they are more of a symbol than a real obstacle, unless you happen to be a toddler." }, tile: { glyph: "₊", color: "#ccf" }, passable: false, transparent: true },
    bookcase: { name: "bookcase", descriptions: { default: "Boring, old bookcase. Of course, it's not like it's full of books, because nobody keeps those around any more. But the name stuck." }, tile: { glyph: "Ξ", color: "#cff" }, passable: false, transparent: false },
    pottedPlant: { name: "potted plant", descriptions: { default: "Boring, old potted plant. You are reasonably sure that it is, in fact, an actual plant, not a plastic imitation; this is reinforced by the fact that a few of the leaves are dry." }, tile: { glyph: "♠", color: "#0f0" }, passable: false, transparent: true },
    serverRack: { name: "server rack", descriptions: { default: "Boring, old server rack. Suspiciously quiet; it's like they are off, if not for the bliking lights." }, tile: { glyph: "ʭ", color: "#ccc" }, passable: false, transparent: false }
};

/* tslint:enable:max-line-length */

const mapTiles: Map<string, IMapTile> = new Map<string, IMapTile>();
mapTiles.set(".", tiles.floor);
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
mapTiles.set("ከ", tiles.chair);
mapTiles.set("Π", tiles.desk);
mapTiles.set("C", tiles.closet);
mapTiles.set("Ѫ", tiles.mainframe);
mapTiles.set("₊", tiles.lowDoor);
mapTiles.set("Ξ", tiles.bookcase);
mapTiles.set("♠", tiles.pottedPlant);
mapTiles.set("ʭ", tiles.serverRack);

export { mapTiles };
