import { PrototypeSchema } from "./PrototypeSchema";
import { Entity } from "./Entity";
import { Kernox } from "../Kernox";
export declare class EntityFactory {
    private __kernox;
    private types;
    private pools;
    private nextID;
    constructor(__kernox: Kernox);
    prototype(prototype: PrototypeSchema<any>, namespace?: string): void;
    create(type: string, params: object): Entity;
    copyFromPrototype(recipient: Entity, prototype: PrototypeSchema<any>): void;
    sendToRest(entity: Entity): void;
    private resolveImplicitNamespace;
    private deepAssign;
}
