import { GameMap } from "./map";
import { Scheduler } from 'rot-js';
import Simple from "rot-js/lib/scheduler/simple";
import { GameEngine } from "./engine";
import { DisplayManager } from "./display";
import { Actor } from "./actors/actor";
import { Player } from "./actors/player";
import { inputManager } from "./input";

export class GameManager {
    map: GameMap;
    scheduler: Simple;
    engine: GameEngine;
    displayManager: DisplayManager;
    player: Player;

    constructor(player: Player, map: GameMap, displayManager: DisplayManager) {
        this.player = player;
        this.map = map;
        this.displayManager = displayManager;

        this.scheduler = new Scheduler.Simple();
        this.engine = new GameEngine(this.scheduler, map);

        this.registerActor(player);
    }

    registerActor(actor: Actor) {
        this.scheduler.add(actor, true);
        this.map.actorList.push(actor);
    }

    redraw() {
        this.displayManager.gameDisplay.clear();
        this.displayManager.drawMap(this.map);
        this.displayManager.drawInterface(this.player);
    }

    startEngine() {
        this.engine.start(this.redraw.bind(this, this.player));
    }

    runMap() {
        // TODO: variable draw radius
        this.map.recalculatePlayerFov();
        this.map.recalculateEnemyFov();

        this.displayManager.drawInterface(this.player);
        this.redraw();

        const inputHandler = inputManager.handleInput.bind(inputManager, this.player, this.map, this.displayManager);

        // register input handlers
        addEventListener("keydown", e => inputHandler(e));

        addEventListener("mousedown", e => {
            const p = this.displayManager.gameDisplay.eventToPosition(e);
            const data = this.map.tryLookAt(p[0], p[1]);
            if (typeof data !== 'undefined') {
                this.displayManager.addMessage(`You seed a ${data.name}. ${data.desc}`);
            }
        });

        this.displayManager.addMessage("Welcome to Vratislavia! Press 'p' for help.");

        this.startEngine();
    }
}
