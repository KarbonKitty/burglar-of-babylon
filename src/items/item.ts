import { Actor } from "../actors/actor";

export class Item {
    name: string;
    glyph: string;
    use: (user: Actor) => void;

    constructor(name: string, glyph: string, useFunc: (user: Actor) => void) {
        this.name = name;
        this.glyph = glyph;
        this.use = useFunc;
    }
}
