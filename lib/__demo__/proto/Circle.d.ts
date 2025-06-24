import type { Entity } from "../../entity/Entity";
import type { PrototypeSchema } from "../../entity/PrototypeSchema";
import { Vector2D } from "../utils/Vector2D";
export interface Circle extends Entity {
    position: Vector2D;
    radius: number;
    color: string;
}
export declare const circlePrototype: PrototypeSchema<Circle>;
