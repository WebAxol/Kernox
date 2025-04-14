import { EntityFactory } from "../../entity/EntityFactory.js";
import { enemyPrototype, circlePrototype, spatialPrototype,kineticPrototype } from "../__samples__/entityPrototypes.js";

const entityFactory = new EntityFactory();

entityFactory.prototype(enemyPrototype); 

describe("EntityFactory.prototype()", () => {

    test("That attributes from all parents are copied correctly and in the right order to the recipient entity", () => {

        const params = {};
        const entity = entityFactory.create("Enemy", params) as any;

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
        const entity = entityFactory.create("Enemy", params) as any;

        expect(entity.position).toEqual(params.position);
        expect(entity.damage).toEqual(params.damage);
    });
});