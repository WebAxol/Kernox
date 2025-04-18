import { SystemManager } from "../../system/SystemManager.js";
import { System }   from "../../system/System.js";
import { Kernox }    from "../../Kernox.js";

class InputSystem extends System {

    public execute(): void {
        console.log("Listening for user inputs");   
    }
};

describe("SystemManager.use()", () => {

    var system, res;
    const kernox = new Kernox();
    const func = () => { 
        res = undefined;
        res = kernox.systemManager.use(system) 
    };

    it("Must throw an error if 'system' provided is not an instance of 'System'", () => {
        system = { execute : () => { console.log("Not a system") } } as System;
        expect(func).toThrow(Error("Expected instance of 'System'"));
    });

    it("Must register the 'System' instance when it hasn't been registered yet", () => {
        system = InputSystem;
        expect(func).not.toThrow();
        expect(res).toBeTruthy();
    });

    it("Must not register duplicates", () => {
        system = InputSystem;
        expect(func).not.toThrow();
        expect(res).toBeFalsy();
    });

});