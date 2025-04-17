import type { PrototypeSchema } from "../../../dist/kernox";
import { Kinetic } from "./Kinetic";
import { Sprite } from "./Sprite";
export interface Avatar extends Kinetic, Sprite {
    hp: number;
    level: number;
    active: boolean;
}
export declare const avatarPrototype: PrototypeSchema<Avatar>;
