import { EntityFactory } from "../../entity/EntityFactory.js";
import { enemyPrototype, circlePrototype, spatialPrototype, kineticPrototype, corpsePrototype } from "../__samples__/entityPrototypes.js";
import { Kerno } from "../../Kerno.js";
const entityFactory = new EntityFactory(new Kerno());
entityFactory.prototype(enemyPrototype);
entityFactory.prototype(corpsePrototype);
describe("EntityFactory.prototype()", () => {
    test("That attributes from all parents are copied correctly and in the right order to the recipient entity", () => {
        const params = {};
        const entity = entityFactory.create("Enemy", params);
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
            position: { x: 10, y: 15 },
            damage: 100
        };
        const entity = entityFactory.create("Enemy", params);
        expect(entity.position).toEqual(params.position);
        expect(entity.damage).toEqual(params.damage);
    });
    test("Creation of an entity from an already existing one", () => {
        const enemy = entityFactory.create("Enemy", {
            position: { x: 10, y: 15 },
            damage: 100,
        });
        const corpse = entityFactory.create("Corpse", enemy);
        expect(corpse.type).toBe("Corpse");
        expect(corpse.loot).toEqual(enemy.loot);
        expect(corpse.position).toEqual(enemy.position);
        expect(corpse.velocity).not.toBeDefined();
        expect(corpse.acceleration).not.toBeDefined();
    });
});
//# sourceMappingURL=create.test.js.map