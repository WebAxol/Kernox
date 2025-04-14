import { System } from "../../system/System.js";
import { Kerno } from "../../Kerno.js";
class InputSystem extends System {
    execute() {
        console.log("Listening for user inputs");
    }
}
;
describe("SystemManager.use()", () => {
    var system, res;
    const kerno = new Kerno();
    const func = () => {
        res = undefined;
        res = kerno.systemManager.use(system);
    };
    it("Must throw an error if 'system' provided is not an instance of 'System'", () => {
        system = { execute: () => { console.log("Not a system"); } };
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
//# sourceMappingURL=use.test.js.map