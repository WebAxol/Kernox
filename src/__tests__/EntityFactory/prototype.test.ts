import { EntityFactory } from "../../entity/EntityFactory.js";
import { enemyPrototype, circlePrototype, spatialPrototype,kineticPrototype } from "../__samples__/prototypes.js";
import { Kernox } from "../../Kernox.js";

const entityFactory = new EntityFactory(new Kernox());

describe("EntityFactory.prototype()", () => {

    const func = (prototype) => { return entityFactory.prototype(prototype) }

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