import { CollectionManager } from "../../collection/CollectionManager.js";
import { ArrayList } from "../../collection/ArrayList.js";
import { Kernox } from "../../Kernox.js";

const collectionManager = new CollectionManager(new Kernox());

class Players extends ArrayList {};

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