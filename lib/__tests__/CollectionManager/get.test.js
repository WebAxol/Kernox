import { CollectionManager } from "../../collection/CollectionManager.js";
import { LinearCollection } from "../../collection/LinearCollection.js";
import { Kerno } from "../../Kerno.js";
const collectionManager = new CollectionManager(new Kerno());
class Dogs extends LinearCollection {
}
;
collectionManager.use(Dogs);
describe("CollectionManager.get()", () => {
    var collectionName, res;
    const func = () => {
        res = undefined;
        res = collectionManager.get(collectionName);
    };
    it("Must throw an error if an unexisting collection is requested", () => {
        collectionName = "Cats";
        expect(func).toThrow(Error(`Collection '${collectionName}' is not registered.`));
    });
    it("Must return the corresponding instance of 'AbstractCollection' when a registered collection name is provided", () => {
        collectionName = "Dogs";
        expect(func).not.toThrow();
        expect(res).toBeInstanceOf(LinearCollection);
    });
});
//# sourceMappingURL=get.test.js.map