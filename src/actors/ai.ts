import { GameMap } from "../map";
import { GamePosition, Directions } from "../position";
import { Actor } from "./actor";
import { Path } from "rot-js";

export interface AI {
    act: (actor: Actor, map: GameMap) => Promise<void>;
}

export class Wanderer implements AI {
    act(actor: Actor, map: GameMap) {
        const choice = Math.random();
        let newPosition: GamePosition;
        let newDirection: Directions;
        if (choice <= 0.2) {
            return Promise.resolve();
        } else if (choice <= 0.4) {
            newPosition = actor.position.east;
            newDirection = Directions.east;
        } else if (choice <= 0.6) {
            newPosition = actor.position.west;
            newDirection = Directions.west;
        } else if (choice <= 0.8) {
            newPosition = actor.position.south;
            newDirection = Directions.south;
        } else {
            newPosition = actor.position.north;
            newDirection = Directions.north;
        }

        if (map.isPositionAvailable(newPosition)) {
            actor.position = newPosition;
            actor.direction = newDirection;
            map.recalculateEnemyFov();
        }

        return Promise.resolve();
    }
}

export class Patrol implements AI {
    private pointA: GamePosition;
    private pointB: GamePosition;
    private target: "a" | "b";

    constructor(pointA: GamePosition, pointB: GamePosition) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.target = "b";
    }

    act(actor: Actor, map: GameMap) {
        if (!this.checkConditions(actor)) {
            return Promise.resolve();
        }

        const goal = this.target === "a" ? this.pointA : this.pointB;
        const pathfinder = new Path.AStar(goal.x, goal.y, (x, y) => map.isTilePathable(x, y, actor));
        const steps: GamePosition[] = [];
        pathfinder.compute(actor.position.x, actor.position.y, (x, y) => steps.push(new GamePosition(x, y)));

        // This will freeze actor in place, but at least it won't crash
        if (steps.length < 2) {
            return Promise.resolve();
        }

        const firstStep = steps[1];

        if (map.isPositionAvailable(firstStep)) {
            const newDirection = firstStep.directionFrom(actor.position).toEnum() || actor.direction;
            actor.position = firstStep;
            actor.direction = newDirection;
            map.recalculateEnemyFov();
        } else {
            map.interactAt(firstStep, actor);
        }

        if (actor.position.x === this.pointA.x && actor.position.y === this.pointA.y) {
            this.target = "b";
        }

        if (actor.position.x === this.pointB.x && actor.position.y === this.pointB.y) {
            this.target = "a";
        }

        return Promise.resolve();
    }

    private checkConditions(actor: Actor): boolean {
        let retVal = true;

        if (actor.conditions.find(c => c.type === 'stunned')) {
            retVal = false;
        }

        actor.conditions = actor.conditions.map(c => {
            c.duration -= 1;
            return c;
        }).filter(c => c.duration > 0);

        return retVal;
    }
}
