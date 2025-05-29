import { CollectionManager } from "../../collection/CollectionManager.js";
import { ArrayList } from "../../collection/ArrayList.js";
import { Kernox } from "../../Kernox.js";
import { System } from "../../system/System.js";

const app = new Kernox();
const sys = new System(app, "");


class Dogs extends ArrayList {};

app.collectionManager.use(Dogs);

describe("Service.getCollection()", () => {

    var collectionName, res;
    const func = () => { 
        res = undefined;
        // Method is private: forcing the call
        res = (sys as any).getCollection(collectionName); 
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