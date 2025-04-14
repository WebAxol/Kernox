import EntityManager from "../../../src/EntityManager.js";

const entityManager = new EntityManager();
const n = 100;
// prototype

for(let i = 1; i <= n; i++){

    test('properly detect entity invalid type name', () => {
        expect(entityManager.prototype(i, { a : '' })).toEqual(false); 
    });  
    
    test('properly register entity type', () => {
        expect(entityManager.prototype(i + '' ,{ a : '' })).toEqual(true);
    });

}

for(let i = 1; i <= n; i++){

    // entity types from '1' to '200' already exist, so we expect false

    test('properly detect if entity type already exists', () => {
        expect(entityManager.prototype(i + '', { a : '' })).toEqual(false); 
    });  
}
