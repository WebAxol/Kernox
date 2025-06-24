import { EntityFactory } from "../../entity/EntityFactory.js";
import { enemyPrototype, circlePrototype, spatialPrototype,kineticPrototype, corpsePrototype } from "../__samples__/prototypes.js";
import { Kernox } from "../../Kernox.js";
import { Circles, Dead, Enemies, Kinetics } from "../__samples__/collections.js";

const kernox = new Kernox(); 

kernox.entityFactory.prototype(enemyPrototype); 
kernox.entityFactory.prototype(corpsePrototype);
kernox.collectionManager.use(Enemies);
kernox.collectionManager.use(Dead);
kernox.collectionManager.use(Circles);
kernox.collectionManager.use(Kinetics);

describe("EntityFactory.create()", () => {

    test("That attributes from all parents are copied correctly and in the right order to the recipient entity", () => {

        const params = {};
        const entity = kernox.entityFactory.create("Enemy", params) as any;

        expect(entity.type).toBe("Enemy");
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
        const entity = kernox.entityFactory.create("Enemy", params) as any;

        expect(entity.position).toEqual(params.position);
        expect(entity.damage).toEqual(params.damage);
    });

    test("Creation of an entity from an already existing one", () => {

        const enemy : any = kernox.entityFactory.create("Enemy", {
            position : { x : 10, y : 15 }, 
            damage : 100, 
        });

        const corpse : any = kernox.entityFactory.create("Corpse", enemy);
    
        expect(corpse.type).toBe("Corpse");
        expect(corpse.loot).toEqual(enemy.loot);
        expect(corpse.position).toEqual(enemy.position);
        expect(corpse.velocity).not.toBeDefined();
        expect(corpse.acceleration).not.toBeDefined();
    });
});