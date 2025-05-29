import { AbstractCollection } from "./AbstractCollection.js";
import { Entity } from "../entity/Entity.js";
import { ArrayList } from "./ArrayList.js";
import { isSubclassOf } from "../utils/isSubclassOf.js";
import { Kernox } from "../Kernox.js";

export class CollectionManager {

    private collections : Map<string, AbstractCollection> = new Map();
    private toRemove    : Set<Entity> = new Set();

    constructor( private __kernox : Kernox ) {}

    /**
     * Searches for a collection by name and retrieves it if found.
     * @param collectionName Name of collection
     * @returns 
     */

    public get<T extends AbstractCollection>(collectionName : string) : T {
        const collection = this.collections.get(collectionName) || this.resolveImplicitNamespace(collectionName);
        if (!collection) {
            throw new Error(`Collection '${collectionName}' is not registered.`);
        }
        return collection as T;
    }

    /**
     * Registers new collection based on a constructor; the collection is identified by the name of its parent class.
     * @param Ctr sub-class of AbstractCollection.
     * @param namespace Optional parameter used by AddonLoader to specify a context when loading collections from an addon.
     */

    public use(Ctr : new () => AbstractCollection, namespace :  string = ''): void {

        if(!(isSubclassOf(Ctr,AbstractCollection))){
            throw new Error("Invalid collection: it must be a sub-class of AbstractCollection")
        }

        const name = namespace ? `${namespace}.${Ctr.name}` : Ctr.name;
        
        if(this.collections.has(name)){
            throw new Error(`Cannot register collection '${name}' because it already exists`);
        }

        const collection = new Ctr();

        this.collections.set(name, collection);
    }

    public addEntityTo(entity : Entity, collectionName : string): void {
        const collection = this.get(collectionName);
        collection.insert(entity);
        entity.linkTo(collectionName);
    }

    public removeEntityFrom(entity: Entity, collectionName: string): void {
        const collection = this.get(collectionName);
        collection.remove(entity);
        entity.unlinkFrom(collectionName);
    }

    private remindToForget(entity : Entity): void {
        this.toRemove.add(entity);
    }

    public flushRemoved(): void {
        for (const entity of this.toRemove) {
            for (const collectionName of entity.collections()) {
                this.removeEntityFrom(entity, collectionName);
            }
        }
        this.toRemove.clear();
    }

    private resolveImplicitNamespace(collectionName : string) : AbstractCollection | undefined {
        const namespaces = this.__kernox.addonLoader.namespaces;
        
        var resolved, resource;

        for(const namespace of namespaces){
            resource = this.collections[`${namespace}.${collectionName}`];
            if(resource && !resolved) resolved = resource;
            else if(resource){ 
                throw new Error(`Ambiguous collection '${collectionName}' was requested: a namespace must be specified before it ( Ex. namespace.collectionName ).`);
            }
        }

        return resolved;
    }
}