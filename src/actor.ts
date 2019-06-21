import { MapEntity } from "./display";

export interface Actor {
    appearance: MapEntity;
    act(): void;
}
