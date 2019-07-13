import { Actor } from "../actors/actor";

export class Item {
    name: string;
    glyph: string;
    usesLeft?: number;
    use: (user: Actor) => string;

    constructor(name: string, glyph: string, useFunc: (user: Actor) => string, usesLeft?: number) {
        this.name = name;
        this.glyph = glyph;
        this.usesLeft = usesLeft;
        this.use = useFunc;
    }
}

export class ItemInfo {
    name: string;
    glyph: string;

    constructor(item: Item) {
        this.name = item.name;
        this.glyph = item.glyph;
    }
}
