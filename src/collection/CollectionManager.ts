import { AbstractCollection } from "./AbstractCollection.js";
import { Entity } from "../entity/Entity.js";
import { LinearCollection } from "./LinearCollection.js";

type CollectionType = ( "linear" | "sorted-list" );

export class CollectionManager {

    private collections : Map<string, AbstractCollection> = new Map();
    private toRemove    : Set<Entity> = new Set();
    private types       : { [ type : string ] : any } = {
        "linear" : LinearCollection
    };

    constructor() {}

    public getCollection(collectionName : string) : AbstractCollection {
        const collection = this.collections.get(collectionName);
        if (!collection) {
            throw new Error(`Collection '${collectionName}' is not registered.`);
        }
        return collection;
    }

    public registerCollection(collectionName : string, collectionType : CollectionType = "linear"): AbstractCollection {
        
        if(!collectionName){
            throw new Error("Invalid collection name: it must be a nom-empty string");
        }

        if (this.collections.has(collectionName)) {
            throw new Error(`Collection '${collectionName}' already exists.`);
        }

        const Collection = this.types[collectionType];

        if(!Collection){
            throw new Error(`Invalid collection type '${collectionType}'.`);
        }

        const instance = new Collection();
        this.collections.set(collectionName, instance);

        return instance;
    }

    public addEntityTo(entity : Entity, collectionName : string): void {
        const collection = this.getCollection(collectionName);
        collection.insert(entity);
        entity.linkTo(collectionName);
    }

    public removeEntityFrom(entity: Entity, collectionName: string): void {
        const collection = this.getCollection(collectionName);
        collection.remove(entity);
        entity.unlinkFrom(collectionName);
    }

    private remindToForget(entity : Entity): void {
        this.toRemove.add(entity);
    }

    public flushRemoved(): void {
        for (const entity of this.toRemove) {
            for (const collectionName of entity.getCollections()) {
                this.removeEntityFrom(entity, collectionName);
            }
        }
        this.toRemove.clear();
    }
}