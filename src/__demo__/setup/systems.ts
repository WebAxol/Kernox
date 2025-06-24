import { AspectSystem } from "../systems/AspectSystem.js";
import { CollisionSystem } from "../systems/CollisionSystem.js";
import { MovementSystem } from "../systems/MovementSystem.js";
import { RenderingSystem } from "../systems/RenderingSystem.js";

// It is recommended to bundle systems within an array, at the order they must execute

export const systems = [ 
    AspectSystem,
    MovementSystem,
    CollisionSystem, 
    RenderingSystem
];