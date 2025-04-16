import { PrototypeSchema } from "../entity/PrototypeSchema";
import { AbstractCollection } from "../collection/AbstractCollection";
import { System } from "../system/System";
export interface KernoAddon {
    name: string;
    prototypes?: PrototypeSchema<any>[];
    collections?: (new (...args: any[]) => AbstractCollection)[];
    systems?: (new (...args: any[]) => System)[];
    listeners?: {
        [eventName: string]: (new (...args: any[]) => System);
    };
    dependancies?: KernoAddon[];
}
