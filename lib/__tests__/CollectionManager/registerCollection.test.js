import { CollectionManager } from "../../collection/CollectionManager.js";
import { LinearCollection } from "../../collection/LinearCollection.js";
const collectionManager = new CollectionManager();
describe("CollectionManager.registerCollection()", () => {
    var collectionName, collectionType, res;
    const func = () => {
        res = undefined;
        res = collectionManager.registerCollection(collectionName, collectionType);
    };
    it("Must throw an error if an invalid name is provided", () => {
        collectionName = "";
        expect(func).toThrow(Error("Invalid collection name: it must be a nom-empty string"));
    });
    it("Must throw an error if an invalid collection type is given", () => {
        collectionName = "players";
        collectionType = "ternary-search-tree";
        expect(func).toThrow(Error(`Invalid collection type '${collectionType}'.`));
    });
    it("Must execute with no errors when a valid collection type and name are given; must return an instance of AbstractCollection", () => {
        collectionName = "players";
        collectionType = "linear";
        expect(func).not.toThrow();
        expect(res).toBeInstanceOf(LinearCollection);
    });
    it("Must not allow duplicated collection names", () => {
        collectionName = "players";
        collectionType = "linear";
        expect(func).toThrow(`Collection '${collectionName}' already exists.`);
    });
});
//# sourceMappingURL=registerCollection.test.js.map