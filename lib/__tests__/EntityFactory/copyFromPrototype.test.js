import { EntityFactory } from "../../entity/EntityFactory.js";
import { Entity } from "../../entity/Entity.js";
import { Kerno } from "../../Kerno.js";
describe("EntityFactory.copyFromPrototype()", () => {
    const entityFactory = new EntityFactory(new Kerno());
    class Item {
        constructor(name, amount) {
            this.name = name;
            this.amount = amount;
        }
    }
    const prototype = {
        name: "Pink Soldier",
        attributes: {
            position: { x: 10.4, y: -3 },
            hp: 500,
            inventory: [
                new Item("Sword", 1),
                new Item("Apple", 5),
                new Item("Stones", 10)
            ]
        },
        collections: new Set(["CollectionA", "CollectionB", "CollectionC"])
    };
    const recipient = new Entity(1 + "", "TestType");
    const func = () => { return entityFactory.copyFromPrototype(recipient, prototype); };
    it("must copy all attributes from prototype to recipient with the same values", () => {
        expect(func).not.toThrow();
        for (let attr of Object.keys(prototype.attributes)) {
            if (attr.includes("__"))
                continue;
            expect(recipient[attr]).toEqual(prototype.attributes[attr]);
        }
        ;
    });
});
//# sourceMappingURL=copyFromPrototype.test.js.map