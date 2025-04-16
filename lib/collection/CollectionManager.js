import { AbstractCollection } from "./AbstractCollection.js";
import { isSubclassOf } from "../utils/isSubclassOf.js";
export class CollectionManager {
    constructor(__kerno) {
        this.__kerno = __kerno;
        this.collections = new Map();
        this.toRemove = new Set();
    }
    get(collectionName) {
        const collection = this.collections.get(collectionName) || this.resolveImplicitNamespace(collectionName);
        if (!collection) {
            throw new Error(`Collection '${collectionName}' is not registered.`);
        }
        return collection;
    }
    use(Ctr, namespace = '') {
        if (!(isSubclassOf(Ctr, AbstractCollection))) {
            throw new Error("Invalid collection: it must be a sub-class of AbstractCollection");
        }
        const name = namespace ? `${namespace}.${Ctr.name}` : Ctr.name;
        if (this.collections.has(name)) {
            throw new Error(`Cannot register collection '${name}' because it already exists`);
        }
        const collection = new Ctr();
        this.collections.set(name, collection);
    }
    addEntityTo(entity, collectionName) {
        const collection = this.get(collectionName);
        collection.insert(entity);
        entity.linkTo(collectionName);
    }
    removeEntityFrom(entity, collectionName) {
        const collection = this.get(collectionName);
        collection.remove(entity);
        entity.unlinkFrom(collectionName);
    }
    remindToForget(entity) {
        this.toRemove.add(entity);
    }
    flushRemoved() {
        for (const entity of this.toRemove) {
            for (const collectionName of entity.collections()) {
                this.removeEntityFrom(entity, collectionName);
            }
        }
        this.toRemove.clear();
    }
    resolveImplicitNamespace(collectionName) {
        const namespaces = this.__kerno.addonLoader.namespaces;
        var resolved, resource;
        for (const namespace of namespaces) {
            resource = this.collections[`${namespace}.${collectionName}`];
            if (resource && !resolved)
                resolved = resource;
            else if (resource) {
                throw new Error(`Ambiguous collection '${collectionName}' was requested: a namespace must be specified before it ( Ex. namespace.collectionName ).`);
            }
        }
        return resolved;
    }
}
//# sourceMappingURL=CollectionManager.js.map