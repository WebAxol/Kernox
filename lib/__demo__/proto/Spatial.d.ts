import { PrototypeSchema } from "../../entity/PrototypeSchema";
import { Entity } from "../../entity/Entity";
export interface Spatial extends Entity {
    position: {
        x: number;
        y: number;
    };
    orientation: {
        x: number;
        y: number;
    };
}
export declare const spatialPrototype: PrototypeSchema<Spatial>;
