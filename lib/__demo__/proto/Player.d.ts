import { Kinetic } from "./Kinetic";
import { PrototypeSchema } from "../../entity/PrototypeSchema";
import { Armed } from "./Armed";
export interface Player extends Kinetic, Armed {
    hp: number;
    name: string;
    level: number;
}
export declare const playerPrototype: PrototypeSchema<Player>;
