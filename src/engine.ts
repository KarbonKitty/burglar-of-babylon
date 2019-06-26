import { Actor } from "./actors/actor";
import Simple from "rot-js/lib/scheduler/simple";

export class GameEngine {
    private scheduler: Simple;

    constructor(scheduler: Simple) {
        this.scheduler = scheduler;
    }

    async start(drawFunction: () => void) {
        while (true) {
            let actor: Actor = this.scheduler.next();
            if (!actor) break;
            await actor.act();
            drawFunction();
        }
    }
}
