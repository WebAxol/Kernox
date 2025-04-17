import type { PrototypeSchema } from "../../../dist/kernox.js";
import { Kinetic } from "./Kinetic.js";
import { Sprite } from "./Sprite.js";
export interface Avatar extends Kinetic, Sprite {
    hp: number;
    level: number;
    active: boolean;
}
export declare const avatarPrototype: PrototypeSchema<Avatar>;
