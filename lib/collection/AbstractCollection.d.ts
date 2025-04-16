import { Entity } from "../entity/Entity.js";
export declare abstract class AbstractCollection {
    protected abstract entities: unknown;
    protected abstract __changed: boolean;
    abstract insert(entity: Entity): void;
    abstract remove(entity: Entity): void;
    abstract iterate(callback: Function): void;
}
