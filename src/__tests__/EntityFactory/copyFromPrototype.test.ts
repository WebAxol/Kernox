import { EntityFactory }    from "../../entity/EntityFactory.js";
import { PrototypeSchema } from "../../entity/PrototypeSchema.js";
import { Entity }           from "../../entity/Entity.js";

describe("EntityFactory.copyFromPrototype()", () => {

    const entityFactory = new EntityFactory();

    class Item {
        constructor(
            public name : string,
            public amount : number
        ){}
    }

    const prototype : PrototypeSchema<any> = { 
        name        : "Pink Soldier",
        attributes  : {
            position : { x : 10.4, y : -3 },
            hp: 500,
            inventory : [ 
                new Item("Sword",1), 
                new Item("Apple",5), 
                new Item("Stones",10) 
            ]
        }, 
        collections : new Set(["CollectionA","CollectionB","CollectionC"]) 
    };

    const recipient : Entity = new Entity(1 + "","TestType");
    
    const func = () => { return entityFactory.copyFromPrototype(recipient,prototype) }

    it("must copy all attributes from prototype to recipient with the same values", () => {
        
        expect(func).not.toThrow();

        for(let attr of Object.keys(prototype.attributes)){

            if(attr.includes("__")) continue; // Ignore internal entity attributes

            expect(recipient[attr]).toEqual(prototype.attributes[attr]);
        };
    })

});