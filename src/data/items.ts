import { Item } from "../items/item";
import { Player } from "../actors/player";

export const items = {
    signalJammer: new Item("signal jammer", "%", user => {
        if (typeof (user as Player).alertLevel !== 'undefined' && (user as Player).alertLevel > 0) {
            (user as Player).alertLevel -= 1;
            return "Signal jammer have reduced the alert level by 1!";
        } else {
            return "There is no alert for signal jammer to reduce.";
        }
    })
};
