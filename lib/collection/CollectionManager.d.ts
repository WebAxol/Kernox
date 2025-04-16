import { AbstractCollection } from "./AbstractCollection.js";
import { Entity } from "../entity/Entity.js";
import { Kernox } from "../Kernox.js";
export declare class CollectionManager {
    private __kernox;
    private collections;
    private toRemove;
    constructor(__kernox: Kernox);
    get(collectionName: string): AbstractCollection;
    use(Ctr: new () => AbstractCollection, namespace?: string): void;
    addEntityTo(entity: Entity, collectionName: string): void;
    removeEntityFrom(entity: Entity, collectionName: string): void;
    private remindToForget;
    flushRemoved(): void;
    private resolveImplicitNamespace;
}
