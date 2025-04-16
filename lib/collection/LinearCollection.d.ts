import { AbstractCollection } from "./AbstractCollection";
import { Entity } from "../entity/Entity";
export declare class LinearCollection extends AbstractCollection {
    protected readonly entities: Set<Entity>;
    protected __changed: boolean;
    insert(entity: Entity): void;
    remove(entity: Entity): void;
    has(entity: Entity): boolean;
    iterate(callback: (entity: Entity) => void): void;
    filter(criteria: (entity: Entity) => boolean): Entity[];
    get changed(): boolean;
}
