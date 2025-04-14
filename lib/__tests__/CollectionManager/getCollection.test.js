import { CollectionManager } from "../../collection/CollectionManager.js";
import { LinearCollection } from "../../collection/LinearCollection.js";
const collectionManager = new CollectionManager();
collectionManager.registerCollection("dogs", "linear");
describe("CollectionManager.getCollection()", () => {
    var collectionName, res;
    const func = () => {
        res = undefined;
        res = collectionManager.getCollection(collectionName);
    };
    it("Must throw an error if an unexisting collection is requested", () => {
        collectionName = "cats";
        expect(func).toThrow(Error(`Collection '${collectionName}' is not registered.`));
    });
    it("Must return the corresponding instance of 'AbstractCollection' when a registered collection name is provided", () => {
        collectionName = "dogs";
        expect(func).not.toThrow();
        expect(res).toBeInstanceOf(LinearCollection);
    });
});
//# sourceMappingURL=getCollection.test.js.map