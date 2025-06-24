import { CollectionManager } from "../../collection/CollectionManager.js";
import { ArrayList } from "../../collection/ArrayList.js";
import { Kernox } from "../../Kernox.js";

const collectionManager = new CollectionManager(new Kernox());

class Dogs extends ArrayList {};

collectionManager.use(Dogs);

describe("CollectionManager.get()", () => {

    var collectionName, res;
    const func = () => { 
        res = undefined;
        res = collectionManager.get(collectionName); 
    }

    it("Must throw an error if an unexisting collection is requested", () => {
        collectionName = "Cats";
        expect(func).toThrow(Error(`Collection '${collectionName}' is not registered.`));
    });

    it("Must return the corresponding instance of 'AbstractCollection' when a registered collection name is provided", () => {
        collectionName = "Dogs";
        expect(func).not.toThrow();
        expect(res).toBeInstanceOf(ArrayList);
    });
});