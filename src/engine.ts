import { Actor } from "./actors/actor";
import Simple from "rot-js/lib/scheduler/simple";
import { GameMap } from "./map";

export class GameEngine {
    private scheduler: Simple;
    private map: GameMap;

    constructor(scheduler: Simple, map: GameMap) {
        this.scheduler = scheduler;
        this.map = map;
    }

    async start(drawFunction: () => void) {
        while (true) {
            let actor: Actor = this.scheduler.next();
            if (!actor) break;
            await actor.act(this.map);
            drawFunction();
        }
    }
}
