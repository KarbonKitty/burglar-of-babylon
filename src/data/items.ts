import { ItemTemplate } from "../items/item";
import { Player } from "../actors/player";
import { time } from "../time";
import { inputManager } from "../input";

// TODO: create itemManager to create instances
export const items = {
    signalJammer: new ItemTemplate("signal jammer", { glyph: "%", color: "#99f" }, user => {
        if (typeof (user as Player).alertLevel !== 'undefined' && (user as Player).alertLevel > 0) {
            (user as Player).alertLevel -= 1;
            return Promise.resolve("Signal jammer have reduced the alert level by 1!");
        } else {
            return Promise.resolve("There is no alert for signal jammer to reduce.");
        }
    }, 1),
    watch: new ItemTemplate("watch", { glyph: "@", color: "#666" }, user => {
        return Promise.resolve(new Date(time.time).toISOString().split('.')[0].split('T').join(' '));
    }),
    stunGun: new ItemTemplate("stun gun", { glyph: "Γ", color: "#0cc" }, async (user, map) => {
        const target = await inputManager.getDirection();

        const targetedActor = map.actorAt(target);

        if (typeof targetedActor !== 'undefined') {
            targetedActor.conditions.push({ type: 'stunned', duration: 3 });
            return Promise.resolve(`${targetedActor.name} was stunned!`);
        } else {
            return Promise.resolve(`There is nobody there!`);
        }
    }),
    keycard: new ItemTemplate("keycard", { glyph: "💳", color: "#0ff" }, user =>
        Promise.resolve("This keycard opens server room.")
    ),
    data: new ItemTemplate("data", { glyph: "␀", color: "#fff" }, user =>
        Promise.resolve("It's heavily encrypted, so you won't be able to read it. Better to head to the lifts now.")
    )
};
