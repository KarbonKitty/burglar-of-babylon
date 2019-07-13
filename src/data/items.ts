import { Item } from "../items/item";
import { Player } from "../actors/player";
import { time } from "../time";

// TODO: create itemManager to create instances
export const items = {
    signalJammer: new Item("signal jammer", "%", user => {
        if (typeof (user as Player).alertLevel !== 'undefined' && (user as Player).alertLevel > 0) {
            (user as Player).alertLevel -= 1;
            return "Signal jammer have reduced the alert level by 1!";
        } else {
            return "There is no alert for signal jammer to reduce.";
        }
    }),
    watch: new Item("watch", "@", user => {
        return new Date(time.time).toISOString().split('.')[0].split('T').join(' ');
    })
};
