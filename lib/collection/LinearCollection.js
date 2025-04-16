import { AbstractCollection } from "./AbstractCollection";
export class LinearCollection extends AbstractCollection {
    constructor() {
        super(...arguments);
        this.entities = new Set();
        this.__changed = false;
    }
    insert(entity) {
        this.entities.add(entity);
        entity.linkTo(this.constructor.name);
        this.__changed = true;
    }
    remove(entity) {
        this.entities.delete(entity);
        entity.unlinkFrom(this.constructor.name);
        this.__changed = true;
    }
    has(entity) {
        return this.entities.has(entity);
    }
    iterate(callback) {
        this.entities.forEach(callback);
    }
    filter(criteria) {
        return Array.from(this.entities).filter(criteria);
    }
    get changed() {
        return this.__changed;
    }
}
//# sourceMappingURL=LinearCollection.js.map