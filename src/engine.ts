import { Actor } from "./actors/actor";
import { GameMap } from "./map";
import Simple from "rot-js/lib/scheduler/simple";

export class GameEngine {
    private scheduler: Simple;
    private map: GameMap;

    constructor(scheduler: Simple, map: GameMap) {
        this.scheduler = scheduler;
        this.map = map;
    }

    async start(drawFunction: () => void) {
        while (true) {
            const actor: Actor = this.scheduler.next();
            if (!actor) {
                break;
            }
            await actor.act(actor, this.map);
            drawFunction();
        }
    }
}
