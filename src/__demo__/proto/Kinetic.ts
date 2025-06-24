import type { Entity } from "../../entity/Entity.js";
import type { PrototypeSchema } from "../../entity/PrototypeSchema.js";
import { Vector2D } from "../utils/Vector2D.js";

export interface Kinetic extends Entity {
    position : Vector2D;
    velocity : Vector2D;
  };
  
export const kineticPrototype : PrototypeSchema<Kinetic> = {
    name : "Kinetic",
    attributes : {
        position : new Vector2D(0,0),
        velocity : new Vector2D(0,0)
    } as Kinetic,

    collections : new Set([ "Kinetics" ]) 
};
