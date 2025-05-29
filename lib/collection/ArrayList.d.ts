import { AbstractCollection } from "./AbstractCollection";
import { Entity } from "../entity/Entity";
export declare class ArrayList extends AbstractCollection {
    protected readonly entities: Set<Entity>;
    protected __changed: boolean;
    /**
     * Appends an entity at the end of the current collection.
     * @returns True if a new entity was added, and false otherwise.
     */
    insert(entity: Entity): boolean;
    /**
     * Removes an entity from the current collection, if exists.
     * @returns True if the entity was removed, and false otherwise.
     */
    remove(entity: Entity): boolean;
    /**
     * Evaluates if a given entity belongs to the collection.
     */
    has(entity: Entity): boolean;
    [Symbol.iterator](): Generator<any, void, unknown>;
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
    iterator(start?: number, end?: number, step?: number): IterableIterator<Entity>;
    /**
     * @returns An array populated with all entities within the collection.
     */
    toArray(): Entity[];
    /**
     * @param criteria Boolean callback used to filter entities.
     * @returns Similar to 'toArray', but returns a filtered array of entities from the collection.
     */
    filter(criteria: (entity: Entity) => boolean): Entity[];
    /**
     * @returns The number of entities within the collection.
     */
    size(): number;
    get changed(): boolean;
}
