import { Entity } from "../../entity/Entity";
import { PrototypeSchema } from "../../entity/PrototypeSchema";
export interface Armed extends Entity {
    weapon: any;
    ammo: number;
}
export declare const armedPrototype: PrototypeSchema<Armed>;
