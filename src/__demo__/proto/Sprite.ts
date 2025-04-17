import type { PrototypeSchema, Entity } from "../../../dist/kernox.js";
import { Vector2D } from "../utils/Vector2D.js";

export interface Sprite extends Entity {
    position   : Vector2D;
    dimensions : Vector2D;
    url : string;
  };
  
export const spritePrototype : PrototypeSchema<Sprite> = {
    name : "Sprite",
    attributes : {
        position   : new Vector2D(0,0),
        dimensions : new Vector2D(1,1),
        url : "../assets/default.png"
    } as Sprite,
    collections : new Set([ "Renderables" ])
};