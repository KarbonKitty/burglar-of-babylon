import { MapTile } from "../map";

const mapTiles: Map<string, MapTile> = new Map<string, MapTile>();
mapTiles.set(".", { name: "floor", description: "floor description", tile: { glyph: "⋅", fgColor: "#ccf", bgColor: "#000" }, passable: true, transparent: true } );
mapTiles.set("#", { name: "wall", description: "wall description", tile: { glyph: '#', fgColor: '#ccc', bgColor: '#000' }, passable: false, transparent: false });
mapTiles.set("=", { name: "bed", description: "just a bed", tile: { glyph: "=", fgColor: "#ccf", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("+", { name: "door", description: "door desc", tile: { glyph: "+", fgColor: "#ccf", bgColor: "#000" }, passable: false, transparent: false });
mapTiles.set("T", { name: "table", description: "table description", tile: { glyph: "τ", fgColor: "#ccf", bgColor: "#000" }, passable: false, transparent: true });
mapTiles.set("ל", { name: "chair", description: "chair description", tile: { glyph: "ל", fgColor: "#ccf", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("º", { name: "sink", description: "sink", tile: { glyph: "º", fgColor: "#fff", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("þ", { name: "toilet", description: "toilet", tile: { glyph: "þ", fgColor: "#ffc", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("√", { name: "shower", description: "shower", tile: { glyph: "√", fgColor: "#aaf", bgColor: "#000" }, passable: true, transparent: false });
mapTiles.set("≠", { name: "closet", description: "closet", tile: { glyph: "≠", fgColor: "#ccc", bgColor: "#000" }, passable: false, transparent: false });
mapTiles.set("τ", { name: "counter", description: "counter", tile: { glyph: "τ", fgColor: "#ccf", bgColor: "#000" }, passable: false, transparent: true });
mapTiles.set("π", { name: "nightstand", description: "nightstand", tile: { glyph: "π", fgColor: "#ccf", bgColor: "#000" }, passable: false, transparent: true });
mapTiles.set(" ", { name: "open air", description: "open air", tile: { glyph: " ", fgColor: "#aaa", bgColor: "#111" }, passable: false, transparent: true });
mapTiles.set(">", { name: "stairs down", description: "stairs down", tile: { glyph: ">", fgColor: "#fff", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("<", { name: "stairs up", description: "stairs up", tile: { glyph: "<", fgColor: "#ccf", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("/", { name: "open door", description: "open door", tile: { glyph: "/", fgColor: "#ccf", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("≶", { name: "staircase", description: "stairs up and down", tile: { glyph: "≶", fgColor: "#fff", bgColor: "#000" }, passable: true, transparent: true });
mapTiles.set("_", { name: "elevator floor", description: "elevator floor", tile: { glyph: "_", fgColor: "#ddd", bgColor: "#000" }, passable: true, transparent: true });

export { mapTiles };
