import { AbstractCollection } from "./AbstractCollection.js";
export class ArrayList extends AbstractCollection {
    constructor() {
        super(...arguments);
        this.entities = new Set();
        this.__changed = false;
    }
    /**
     * Appends an entity at the end of the current collection.
     * @returns True if a new entity was added, and false otherwise.
     */
    insert(entity) {
        if (this.has(entity))
            return false;
        this.entities.add(entity);
        entity.linkTo(this.constructor.name);
        this.__changed = true;
        return true;
    }
    /**
     * Removes an entity from the current collection, if exists.
     * @returns True if the entity was removed, and false otherwise.
     */
    remove(entity) {
        if (!this.entities.delete(entity))
            return false;
        entity.unlinkFrom(this.constructor.name);
        this.__changed = true;
        return true;
    }
    /**
     * Evaluates if a given entity belongs to the collection.
     */
    has(entity) {
        return this.entities.has(entity);
    }
    *[Symbol.iterator]() {
        for (let i = 0; i < this.size(); i++) {
            yield this.entities[i];
        }
    }
    /**
     * @param start Initial index: by default equals zero.
     * @param end   Final index; if negative, it points from right to left (ej. -1 points to last element).
     * @param step  Index increment: can be positive or negative, but not be zero. Equals one by default.
     * @returns An iterator for a given index range and step constant.
     * @example
     *
     * for(const entity of collection.iterator(0,10,2)){
     *     // Iterates from index zero to ten incrementing by two each time
     *     console.log(entity);
     * }
     *
     * for(const entity of collection.iterator(0,-1,1)){
     *     // Iterates from index zero to last
     *     console.log(entity);
     * }
     *
     */
    iterator(start = 0, end = -1, step = 1) {
        var index = start;
        const size = this.size();
        const entities = this.entities;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (index < size && index <= end) {
                    return { value: entities[index += step], done: false };
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
    /**
     * @returns An array populated with all entities within the collection.
     */
    toArray() {
        return Array.from(this.entities);
    }
    /**
     * @param criteria Boolean callback used to filter entities.
     * @returns Similar to 'toArray', but returns a filtered array of entities from the collection.
     */
    filter(criteria) {
        return this.toArray().filter(criteria);
    }
    /**
     * @returns The number of entities within the collection.
     */
    size() {
        return this.entities.size;
    }
    get changed() {
        return this.__changed;
    }
}
//# sourceMappingURL=ArrayList.js.map