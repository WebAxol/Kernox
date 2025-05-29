import { Entity } from "../../entity/Entity";
import { ArrayList } from "../../Kernox";

describe("ArrayList.insert()", () => {
    
    const collection = new ArrayList();
 
    const entity1 = new Entity("Dummy","1");
    const entity2 = new Entity("Dummy","2");
    const entity3 = new Entity("Dummy","3");

    (collection as any).entities.add(entity1);
    (collection as any).entities.add(entity2);
    (collection as any).entities.add(entity3);

    var entity;
    const func = () => { return collection.remove(entity) }

    it("must remove an entity if it exists within the collection and return true", () => {
        
        expect((collection as any).entities.size).toBe(3);
        
        entity = entity1;
        expect(func()).toBeTruthy();
        expect((collection as any).entities.size).toBe(2);
        expect((collection as any).entities.has(entity1)).toBeFalsy();
        expect((collection as any).entities.has(entity2)).toBeTruthy();
        expect((collection as any).entities.has(entity3)).toBeTruthy();
        
        entity = entity2;
        expect(func()).toBeTruthy();
        expect((collection as any).entities.size).toBe(1);
        expect((collection as any).entities.has(entity)).toBeFalsy();
        expect((collection as any).entities.has(entity2)).toBeFalsy();
        expect((collection as any).entities.has(entity3)).toBeTruthy();

        entity = entity3;
        expect(func()).toBeTruthy();
        expect((collection as any).entities.size).toBe(0);
        expect((collection as any).entities.has(entity)).toBeFalsy();
        expect((collection as any).entities.has(entity2)).toBeFalsy();
        expect((collection as any).entities.has(entity3)).toBeFalsy();
    });

    it("must return false if the entity does not belong to the collection", () => {
        entity = new Entity("Dummy", "4");
        expect(func()).toBeFalsy();
        expect((collection as any).entities.size).toBe(0);
        expect((collection as any).entities.has(entity)).toBeFalsy();

        entity = entity1
        expect(func()).toBeFalsy();
        expect((collection as any).entities.size).toBe(0);
        expect((collection as any).entities.has(entity)).toBeFalsy();
    });
});