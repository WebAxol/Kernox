import { PrototypeSchema } from "../../entity/PrototypeSchema.js";
import { Entity } from "../../entity/Entity.js";
interface Spatial extends Entity {
    position: {
        x: number;
        y: number;
    };
    orientation: {
        x: number;
        y: number;
    };
}
export declare const spatialPrototype: PrototypeSchema<Spatial>;
interface Kinetic extends Spatial {
    mass: number;
    velocity: {
        x: number;
        y: number;
    };
    acceleration: {
        x: number;
        y: number;
    };
}
export declare const kineticPrototype: PrototypeSchema<Kinetic>;
interface Circle extends Entity {
    position: {
        x: number;
        y: number;
    };
    radius: number;
}
export declare const circlePrototype: PrototypeSchema<Circle>;
interface Enemy extends Circle, Kinetic {
    hp: number;
    damage: number;
    loot: string[];
}
export declare const enemyPrototype: PrototypeSchema<Enemy>;
interface Player extends Circle, Kinetic {
    lifes: number;
    score: number;
    hp: number;
}
export declare const playerPrototype: PrototypeSchema<Player>;
interface Corpse extends Circle, Spatial {
    loot: [];
}
export declare const corpsePrototype: PrototypeSchema<Corpse>;
export {};
