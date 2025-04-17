import type { PrototypeSchema, Entity } from "../../../dist/kernox";
import { Vector2D } from "../utils/Vector2D";
export interface Sprite extends Entity {
    position: Vector2D;
    dimensions: Vector2D;
    url: string;
}
export declare const spritePrototype: PrototypeSchema<Sprite>;
