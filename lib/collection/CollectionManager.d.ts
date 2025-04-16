import { AbstractCollection } from "./AbstractCollection";
import { Entity } from "../entity/Entity";
import { Kernox } from "../Kernox";
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
