import { PrototypeSchema } from "../entity/PrototypeSchema.js";
import { AbstractCollection } from "../collection/AbstractCollection.js";
import { System } from "../system/System.js";

export interface KernoAddon {
    name          : string;
    prototypes?   : PrototypeSchema<any>[];
    collections?  : (new (...args : any[]) => AbstractCollection)[];
    systems?      : (new (...args : any[]) => System)[];
    listeners?    : { [ eventName : string ] : (new (...args : any[]) => System)};
    dependancies? : KernoAddon[];
}