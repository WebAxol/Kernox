import type { PrototypeSchema, Entity } from "../../../dist/kernox.js";
import { Vector2D } from "../utils/Vector2D.js";
export interface Kinetic extends Entity {
    position: Vector2D;
    velocity: Vector2D;
}
export declare const kineticPrototype: PrototypeSchema<Kinetic>;
