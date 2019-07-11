import { Actor } from "../actors/actor";

export class Item {
    name: string;
    glyph: string;
    use: (user: Actor) => string;

    constructor(name: string, glyph: string, useFunc: (user: Actor) => string) {
        this.name = name;
        this.glyph = glyph;
        this.use = useFunc;
    }
}
