import { AbstractCollection } from "./AbstractCollection";
import { Entity } from "../entity/Entity.js";

export class LinearCollection implements AbstractCollection{
    public readonly name: string;
    private readonly entities: Set<Entity> = new Set();

    constructor(name: string) {
        this.name = name;
    }

    insert(entity: Entity): void {
        this.entities.add(entity);
        entity.linkTo(this.name);
    }

    remove(entity: Entity): void {
        this.entities.delete(entity);
        entity.unlinkFrom(this.name);
    }

    has(entity: Entity): boolean {
        return this.entities.has(entity);
    }

    forEach(callback: (entity: Entity) => void): void {
        this.entities.forEach(callback);
    }
}
