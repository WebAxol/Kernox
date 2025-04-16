import { CollectionManager } from "../../collection/CollectionManager.js";
import { LinearCollection } from "../../collection/LinearCollection.js";
import { Kerno } from "../../Kerno.js";
const collectionManager = new CollectionManager(new Kerno());
class Players extends LinearCollection {
}
;
describe("CollectionManager.use()", () => {
    var collection;
    const func = () => { collectionManager.use(collection); };
    it("Must throw an error if an invalid collection is given", () => {
        collection = {};
        expect(func).toThrow(Error(`Invalid collection: it must be a sub-class of AbstractCollection`));
    });
    it("Must execute with no errors when a valid collection is given", () => {
        collection = Players;
        expect(func).not.toThrow();
    });
    it("Must not allow duplicated collection names", () => {
        collection = Players;
        expect(func).toThrow(Error(`Cannot register collection 'Players' because it already exists`));
    });
});
//# sourceMappingURL=use.test.js.map