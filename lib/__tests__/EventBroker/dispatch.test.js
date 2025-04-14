import { Kerno } from "../../Kerno.js";
import { System } from "../../system/System.js";
const app = new Kerno();
var receptor;
class ImplementedSystem extends System {
    ongenericEvent(event) {
        receptor = event;
    }
}
app.systemManager.use(ImplementedSystem);
app.eventBroker.subscribe("genericEvent", "ImplementedSystem");
describe("EventBroker.dispatch()", () => {
    var eventName, details;
    const func = () => { app.eventBroker.dispatch(eventName, details); };
    it("Must call the handler method with 'details' as argument", () => {
        eventName = "genericEvent";
        details = { data: "Hello world" };
        expect(func).not.toThrow();
        expect(receptor).toEqual(details);
    });
});
//# sourceMappingURL=dispatch.test.js.map