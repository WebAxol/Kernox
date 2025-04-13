import { EntityFactory } from "../../../EntityFactory.js";
import { PrototypeSchema } from "../../../types/PrototypeSchema.js";
import { Entity } from "../../../Entity.js";

const entityFactory = new EntityFactory();

interface Spatial extends Entity {
    position    : { x : number, y : number };
    orientation : { x : number, y : number };
};

const spatialPrototype : PrototypeSchema<Spatial> = {
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

const kineticPrototype : PrototypeSchema<Kinetic> = {
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

const circlePrototype : PrototypeSchema<Circle> = {
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

const enemyPrototype : PrototypeSchema<Enemy> = {
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

const func = (prototype) => { return entityFactory.registerType(prototype) }

describe("EntityFactory.registerType()", () => {

    it("must register entity type if it does not exist", () => {
        expect(() => { func(spatialPrototype) }).not.toThrow(Error);
    })

    it("must throw an error if entity type already exists based on name", () => {
        expect(() => { func(spatialPrototype) }).toThrow( Error(`The type named '${spatialPrototype.name}' has already been registered`));
    });

    test("That type registration works correctly for types that inherit from others", () => {
        expect(() => { func(kineticPrototype) }).not.toThrow(Error);
        expect(() => { func(circlePrototype)  }).not.toThrow(Error);
        expect(() => { func(enemyPrototype)   }).not.toThrow(Error);
    });

    test("That attributes are inherited correctly from all origin types to a recipient type with the correct values depending on topological order", () => {

        const params = {};
        const entity = entityFactory.createEntity("Enemy", params) as any;

        expect(entity.orientation).toEqual(spatialPrototype.attributes.orientation);
        expect(entity.mass).toEqual(kineticPrototype.attributes.mass);
        expect(entity.velocity).toEqual(kineticPrototype.attributes.velocity);
        expect(entity.acceleration).toEqual(enemyPrototype.attributes.acceleration);
        expect(entity.radius).toEqual(circlePrototype.attributes.radius);
        expect(entity.position).toEqual(circlePrototype.attributes.position);
        expect(entity.hp).toEqual(enemyPrototype.attributes.hp);
        expect(entity.damage).toEqual(enemyPrototype.attributes.damage);
    });

    test("That values within 'params' have priority over default values", () => {

        const params = { 
            position : { x : 10, y : 15 }, 
            damage : 100 
        };
        const entity = entityFactory.createEntity("Enemy", params) as any;

        expect(entity.position).toEqual(params.position);
        expect(entity.damage).toEqual(params.damage);
    });
});