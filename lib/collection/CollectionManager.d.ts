import { AbstractCollection } from "./AbstractCollection.js";
import { Entity } from "../entity/Entity.js";
import { Kernox } from "../Kernox.js";
export declare class CollectionManager {
    private __kernox;
    private collections;
    private toRemove;
    constructor(__kernox: Kernox);
    /**
     * Searches for a collection by name and retrieves it if found.
     * @param collectionName Name of collection
     * @returns
     */
    get<T extends AbstractCollection>(collectionName: string): T;
    /**
     * Registers new collection based on a constructor; the collection is identified by the name of its parent class.
     * @param Ctr sub-class of AbstractCollection.
     * @param namespace Optional parameter used by AddonLoader to specify a context when loading collections from an addon.
     */
    use(Ctr: new () => AbstractCollection, namespace?: string): void;
    addEntityTo(entity: Entity, collectionName: string): void;
    removeEntityFrom(entity: Entity, collectionName: string): void;
    private remindToForget;
    flushRemoved(): void;
    private resolveImplicitNamespace;
}
