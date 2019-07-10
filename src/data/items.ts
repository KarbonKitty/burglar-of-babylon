import { Item } from "../items/item";
import { Player } from "../actors/player";

export const items = {
    signalJammer: new Item("signal jammer", "%", user => {
        if (typeof (user as Player).alertLevel !== 'undefined' && (user as Player).alertLevel > 0) {
            (user as Player).alertLevel -= 1;
        }
    })
};
