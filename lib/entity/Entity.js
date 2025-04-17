/**
 * First class citizen object whose attributes can be inherited from n other entity types, can be
 * subscribed to entity collections and processed by other functions or class methods. It does not contain behaviour appart from getters and state validators.
 */
export class Entity {
    constructor(__ID, __TYPE) {
        this.__ID = __ID;
        this.__TYPE = __TYPE;
        this.__children = {};
        this.__collections = new Set();
        this.__modified = false;
    }
    get id() {
        return this.__ID;
    }
    get type() {
        return this.__TYPE;
    }
    belongsTo(collectionName) {
        return this.__collections.has(collectionName);
    }
    collections() {
        return this.__collections;
    }
    linkTo(collectionName) {
        this.__collections.add(collectionName);
    }
    unlinkFrom(collectionName) {
        this.__collections.delete(collectionName);
    }
    appendChild(name, child) {
        if (this.__children[name])
            throw Error(`Child already exists with name '${name}' at entity '${this.__ID}'`);
        this.__children[name] = child;
    }
    getChild(name) {
        return this.__children[name];
    }
    deleteChild(name) {
        delete this.__children[name];
    }
}
//# sourceMappingURL=Entity.js.map