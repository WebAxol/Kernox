export class LinearCollection {
    constructor(name) {
        this.entities = new Set();
        this.name = name;
    }
    insert(entity) {
        this.entities.add(entity);
        entity.linkTo(this.name);
    }
    remove(entity) {
        this.entities.delete(entity);
        entity.unlinkFrom(this.name);
    }
    has(entity) {
        return this.entities.has(entity);
    }
    forEach(callback) {
        this.entities.forEach(callback);
    }
}
//# sourceMappingURL=LinearCollection.js.map