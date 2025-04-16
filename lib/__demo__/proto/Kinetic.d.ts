import { PrototypeSchema } from "../../entity/PrototypeSchema";
import { Spatial } from "./Spatial";
export interface Kinetic extends Spatial {
    velocity: {
        x: number;
        y: number;
    };
    acceleration: {
        x: number;
        y: number;
    };
}
export declare const kineticPrototype: PrototypeSchema<Kinetic>;
