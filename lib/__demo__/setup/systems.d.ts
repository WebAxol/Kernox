import { AspectSystem } from "../systems/AspectSystem";
import { CollisionSystem } from "../systems/CollisionSystem";
import { MovementSystem } from "../systems/MovementSystem";
import { RenderingSystem } from "../systems/RenderingSystem";
export declare const systems: (typeof AspectSystem | typeof CollisionSystem | typeof MovementSystem | typeof RenderingSystem)[];
