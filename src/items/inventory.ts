import { Item, ItemInfo } from "./item";
import { Actor } from "../actors/actor";

export class Inventory {
    private items: Item[];
    private limit = 10;

    constructor() {
        this.items = [];
    }

    getAllItemsInfo() {
        return this.items.map(i => new ItemInfo(i));
    }

    getItemInfo(index: number) {
        return new ItemInfo(this.items[index]);
    }

    addItem(item: Item) {
        if (this.items.length < this.limit) {
            this.items.push(item);
            return true;
        } else {
            return false;
        }
    }

    removeItem(item: Item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    useItem(index: number, actor: Actor): string | null {
        const thing = this.items[index];
        if (typeof thing !== 'undefined') {
            const msg = thing.use(actor);
            if (typeof thing.usesLeft !== 'undefined') {
                thing.usesLeft--;
                if (thing.usesLeft === 0) {
                    this.removeAt(index);
                }
            }
            return msg;
        } else {
            return null;
        }
    }

    private removeAt(index: number) {
        this.items.splice(index, 1);
    }
}
