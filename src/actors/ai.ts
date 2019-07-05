import { GameMap } from "../map";
import { GamePosition } from "../position";
import { Actor } from "./actor";

function wander(actor: Actor, map: GameMap) {
    const choice = Math.random();
    let newPosition: GamePosition;
    if (choice <= 0.2) {
        return Promise.resolve();
    } else if (choice <= 0.4) {
        newPosition = actor.position.east;
    } else if (choice <= 0.6) {
        newPosition = actor.position.west;
    } else if (choice <= 0.8) {
        newPosition = actor.position.south;
    } else {
        newPosition = actor.position.north;
    }

    if (map.isPositionAvailable(newPosition)) {
        actor.position = newPosition;
        map.recalculateEnemyFov();
    }

    return Promise.resolve();
}

export { wander }
