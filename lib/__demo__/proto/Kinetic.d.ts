import type { PrototypeSchema, Entity } from "../../../dist/kernox";
import { Vector2D } from "../utils/Vector2D";
export interface Kinetic extends Entity {
    position: Vector2D;
    velocity: Vector2D;
}
export declare const kineticPrototype: PrototypeSchema<Kinetic>;
