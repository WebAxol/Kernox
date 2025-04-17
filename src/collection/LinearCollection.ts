import { AbstractCollection } from "./AbstractCollection.js";
import { Entity } from "../entity/Entity.js";

export class LinearCollection extends AbstractCollection{
    protected readonly entities: Set<Entity> = new Set();
    protected __changed : boolean = false;

    insert(entity: Entity): void {
        this.entities.add(entity);
        entity.linkTo(this.constructor.name);
        this.__changed = true;
    }

    remove(entity: Entity): void {
        this.entities.delete(entity);
        entity.unlinkFrom(this.constructor.name);
        this.__changed = true;
    }

    has(entity: Entity): boolean {
        return this.entities.has(entity);
    }

    iterate(callback: (entity: Entity) => void): void {
        this.entities.forEach(callback);
    }

    filter(criteria : (entity : Entity) => boolean) :Entity[] {
        return Array.from(this.entities).filter(criteria);
    }

    public get changed(){
        return this.__changed;
    }

    
}
