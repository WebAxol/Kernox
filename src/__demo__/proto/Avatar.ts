import type { PrototypeSchema }       from "../../../dist/kernox.js";
import { Kinetic, kineticPrototype  } from "./Kinetic.js";
import { Sprite, spritePrototype    } from "./Sprite.js";

export interface Avatar extends Kinetic, Sprite {
    hp : number;
    level : number;
    active : boolean;
  };
  
export const avatarPrototype : PrototypeSchema<Avatar> = {
    name : "Avatar",
    attributes : {
      hp : 20,
      level : 1,
      active : false
    } as Avatar,
    
    collections : new Set([ "Avatars" ]),
    
    // Multiple inheritance:
  
    inherits : [ 
      kineticPrototype,
      spritePrototype 
    ]
};