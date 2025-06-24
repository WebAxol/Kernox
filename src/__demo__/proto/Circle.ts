import type { Entity } from "../../entity/Entity.js";
import type { PrototypeSchema } from "../../entity/PrototypeSchema.js";
import { Vector2D } from "../utils/Vector2D.js";
import { kineticPrototype } from "./Kinetic.js";

export interface Circle extends Entity {
    position   : Vector2D;
    radius     : number;
    color      : string; 
  };
  
export const circlePrototype : PrototypeSchema<Circle> = {
    name : "Circle",
    attributes : {
        position   : new Vector2D(0,0),
        radius : 1,
        color : "rgb(255,0,0)"
    } as Circle,
    inherits : [ kineticPrototype ], // Circle extends Kinetic
    collections : new Set([ "Renderables" ])
};

