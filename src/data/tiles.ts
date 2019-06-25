import { MapTile } from "../map";

const mapTiles: Map<string, MapTile> = new Map<string, MapTile>();
mapTiles.set(".", { name: "floor", description: "floor description", tile: { glyph: ".", fgColor: "#ccf", bgColor: "#000" }, passable: true, transparent: true } );
mapTiles.set("#", { name: "wall", description: "wall description", tile: { glyph: '#', fgColor: '#ccc', bgColor: '#000' }, passable: false, transparent: false });
mapTiles.set("=", { name: "bed", description: "just a bed", tile: { glyph: "=", fgColor: "#ccf", bgColor: "#000" }, passable: true, transparent: true });

export { mapTiles };
