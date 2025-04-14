import { Entity } from "../entity/Entity.js";

export abstract class AbstractCollection {
    abstract insert(entity : Entity) : void;
    abstract remove(entity : Entity) : void;
}