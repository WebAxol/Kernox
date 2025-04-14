import { LinearCollection } from "./LinearCollection.js";
export class CollectionManager {
    constructor() {
        this.collections = new Map();
        this.toRemove = new Set();
        this.types = {
            "linear": LinearCollection
        };
    }
    getCollection(collectionName) {
        const collection = this.collections.get(collectionName);
        if (!collection) {
            throw new Error(`Collection '${collectionName}' is not registered.`);
        }
        return collection;
    }
    registerCollection(collectionName, collectionType = "linear") {
        if (!collectionName) {
            throw new Error("Invalid collection name: it must be a nom-empty string");
        }
        if (this.collections.has(collectionName)) {
            throw new Error(`Collection '${collectionName}' already exists.`);
        }
        const Collection = this.types[collectionType];
        if (!Collection) {
            throw new Error(`Invalid collection type '${collectionType}'.`);
        }
        const instance = new Collection();
        this.collections.set(collectionName, instance);
        return instance;
    }
    addEntityTo(entity, collectionName) {
        const collection = this.getCollection(collectionName);
        collection.insert(entity);
        entity.linkTo(collectionName);
    }
    removeEntityFrom(entity, collectionName) {
        const collection = this.getCollection(collectionName);
        collection.remove(entity);
        entity.unlinkFrom(collectionName);
    }
    remindToForget(entity) {
        this.toRemove.add(entity);
    }
    flushRemoved() {
        for (const entity of this.toRemove) {
            for (const collectionName of entity.getCollections()) {
                this.removeEntityFrom(entity, collectionName);
            }
        }
        this.toRemove.clear();
    }
}
//# sourceMappingURL=CollectionManager.js.map