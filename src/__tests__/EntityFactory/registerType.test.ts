import { EntityFactory } from "../../entity/EntityFactory.js";
import { enemyPrototype, circlePrototype, spatialPrototype,kineticPrototype } from "../__samples__/entityPrototypes.js";

const entityFactory = new EntityFactory();

describe("EntityFactory.registerType()", () => {

    const func = (prototype) => { return entityFactory.registerType(prototype) }

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
});