import { GameMap } from "./map";
import { Scheduler } from 'rot-js';
import Simple from "rot-js/lib/scheduler/simple";
import { GameEngine } from "./engine";
import { DisplayManager } from "./display";
import { Actor } from "./actors/actor";
import { Player } from "./actors/player";
import { InputManager } from "./input";

export class GameManager {
    map: GameMap;
    scheduler: Simple;
    engine: GameEngine;
    displayManager: DisplayManager;
    player: Player;
    inputManager: InputManager;

    constructor(player: Player, map: GameMap, displayManager: DisplayManager, inputManager: InputManager) {
        this.player = player;
        this.map = map;
        this.displayManager = displayManager;
        this.inputManager = inputManager;

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
        this.map.recalculateFov(this.player.position, 10);
        this.map.recalculateEnemyFov();

        this.displayManager.drawInterface(this.player);
        this.redraw();

        // register input handlers
        addEventListener("keydown", e => this.inputManager.handleInput(e));

        addEventListener("mousedown", e => {
            const p = this.displayManager.gameDisplay.eventToPosition(e);
            const name = this.map.tryLookAt(p[0], p[1]);
            if (typeof name !== 'undefined') {
                this.displayManager.addMessage(`You see a ${name}.`);
            }
        });

        //
        this.startEngine();
    }
}
