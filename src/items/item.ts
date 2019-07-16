import { Actor } from "../actors/actor";
import { Tile } from "../display";

export class Item {
    name: string;
    tile: Tile;
    usesLeft?: number;
    use: (user: Actor) => Promise<string>;

    // this is required to stop ItemTemplate being compatible with Item
    template = false;

    constructor(template: ItemTemplate) {
        this.name = template.name;
        this.tile = template.tile;
        this.usesLeft = template.usesLeft;
        this.use = template.use;
    }
}

export class ItemInfo {
    name: string;
    glyph: string;

    constructor(item: Item) {
        this.name = item.name;
        this.glyph = item.tile.glyph;
    }
}

export class ItemTemplate {
    name: string;
    tile: Tile;
    usesLeft?: number;
    use: (user: Actor) => Promise<string>;

    // this is required to stop ItemTemplate being compatible with Item
    template = "template";

    constructor(name: string, tile: Tile, useFunc: (user: Actor) => Promise<string>, usesLeft?: number) {
        this.name = name;
        this.tile = tile;
        this.usesLeft = usesLeft;
        this.use = useFunc;
    }
}