import { IMapTile } from "../map";

/* tslint:disable:max-line-length */

const mapTiles: Map<string, IMapTile> = new Map<string, IMapTile>();
mapTiles.set(".", { name: "floor", description: "floor description", tile: { glyph: "⋅", color: "#ccf" }, passable: true, transparent: true } );
mapTiles.set("#", { name: "wall", description: "wall description", tile: { glyph: '#', color: '#ccc' }, passable: false, transparent: false });
mapTiles.set("=", { name: "bed", description: "just a bed", tile: { glyph: "=", color: "#ccf" }, passable: true, transparent: true });
mapTiles.set("+", { name: "door", description: "door desc", tile: { glyph: "+", color: "#ccf" }, passable: true /** TODO: make it possible to open doors and make this impassable again */, transparent: false });
mapTiles.set("T", { name: "table", description: "table description", tile: { glyph: "τ", color: "#ccf" }, passable: false, transparent: true });
mapTiles.set("ל", { name: "chair", description: "chair description", tile: { glyph: "ל", color: "#ccf" }, passable: true, transparent: true });
mapTiles.set("º", { name: "sink", description: "sink", tile: { glyph: "º", color: "#fff" }, passable: true, transparent: true });
mapTiles.set("þ", { name: "toilet", description: "toilet", tile: { glyph: "þ", color: "#ffc" }, passable: true, transparent: true });
mapTiles.set("√", { name: "shower", description: "shower", tile: { glyph: "√", color: "#aaf" }, passable: true, transparent: false });
mapTiles.set("≠", { name: "closet", description: "closet", tile: { glyph: "≠", color: "#ccc" }, passable: false, transparent: false });
mapTiles.set("τ", { name: "counter", description: "counter", tile: { glyph: "τ", color: "#ccf" }, passable: false, transparent: true });
mapTiles.set("π", { name: "nightstand", description: "nightstand", tile: { glyph: "π", color: "#ccf" }, passable: false, transparent: true });
mapTiles.set(" ", { name: "open air", description: "open air", tile: { glyph: " ", color: "#aaa" }, passable: false, transparent: true });
mapTiles.set(">", { name: "stairs down", description: "stairs down", tile: { glyph: ">", color: "#fff" }, passable: true, transparent: true });
mapTiles.set("<", { name: "stairs up", description: "stairs up", tile: { glyph: "<", color: "#ccf" }, passable: true, transparent: true });
mapTiles.set("/", { name: "open door", description: "open door", tile: { glyph: "/", color: "#ccf" }, passable: true, transparent: true });
mapTiles.set("≶", { name: "staircase", description: "stairs up and down", tile: { glyph: "≶", color: "#fff" }, passable: true, transparent: true });
mapTiles.set("_", { name: "elevator floor", description: "elevator floor", tile: { glyph: "_", color: "#ddd" }, passable: true, transparent: true });
mapTiles.set("±", { name: "secure door", description: "secure door", tile: { glyph: "±", color: "ccf" }, passable: false, transparent: false });

mapTiles.set("ከ", { name: "office chair", description: "office chair", tile: { glyph: "ከ", color: "#fff" }, passable: true, transparent: true });
mapTiles.set("Π", { name: "office desk", description: "office desk", tile: { glyph: "Π", color: "#fff" }, passable: false, transparent: true });
mapTiles.set("C", { name: "office storage cabinet", description: "office storage cabinet", tile: { glyph: "≠", color: "#fff" }, passable: false, transparent: false });
mapTiles.set("Ѫ", { name: "mainframe", description: "mission target", tile: { glyph: "Ѫ", color: "#fff" }, passable: false, transparent: false });
mapTiles.set("₊", { name: "low door", description: "low door", tile: { glyph: "₊", color: "#ccf" }, passable: false, transparent: true });
mapTiles.set("Ξ", { name: "bookcase", description: "bookcase", tile: { glyph: "Ξ", color: "#cff" }, passable: false, transparent: false });
mapTiles.set("♠", { name: "office plant", description: "office plant", tile: { glyph: "♠", color: "#0f0" }, passable: false, transparent: true });

export { mapTiles };
