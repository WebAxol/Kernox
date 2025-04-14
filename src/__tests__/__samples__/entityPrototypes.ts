import { PrototypeSchema } from "../../entity/PrototypeSchema.js"
import { Entity } from "../../entity/Entity.js"

interface Spatial extends Entity {
    position    : { x : number, y : number };
    orientation : { x : number, y : number };
};

export const spatialPrototype : PrototypeSchema<Spatial> = {
    name : "Spatial",
    attributes : {
        position    : { x : 0, y : 0 },
        orientation : { x : 1, y : 0 },
    } as Spatial
};

interface Kinetic extends Spatial {
    mass : number;
    velocity : { x : number, y : number };
    acceleration : { x : number, y : number };
};

export const kineticPrototype : PrototypeSchema<Kinetic> = {
    name : "Kinetic",
    attributes : {
        mass : 10,
        velocity : { x : 0, y : 0 },
        acceleration : { x : 0, y : 0 }
    } as Kinetic,
    inherits : [ spatialPrototype ],
    collections : new Set([ "kinetics" ])
};

interface Circle extends Entity {
    position : { x : number, y : number };
    radius : number;
};

export const circlePrototype : PrototypeSchema<Circle> = {
    name : "Circle",
    attributes : {
        position : { x : 0, y : 0 },
        radius : 1,
    } as Circle,
    collections : new Set([ "circles" ])
};

interface Enemy extends Circle, Kinetic {
    hp : number,
    damage : number,
    loot : string[]
};

export const enemyPrototype : PrototypeSchema<Enemy> = {
    name : "Enemy",
    attributes : {
        hp     : 100,
        damage : 10,
        loot   : [ "Sword", "Gold" ]
    } as Enemy,
    inherits : [ 
        kineticPrototype, 
        circlePrototype
    ],
    collections : new Set([ "enemies" ])
}
