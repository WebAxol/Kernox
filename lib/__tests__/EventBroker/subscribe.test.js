import { Kerno } from "../../Kerno.js";
import { System } from "../../system/System.js";
const app = new Kerno();
class UnimplementedSystem extends System {
}
class DuplicatedImplementation extends System {
    oncollision(e) { }
    physics_oncollision(e) { }
}
class ImplicitlyImplementedSystem extends System {
    ongenericEvent(e) { }
    oncollision(e) { }
    oninput(e) { }
}
class ExplicitlyImplementedSystem extends System {
    physics_oncollision(e) { }
    controller_oninput(e) { }
    gamepadAdapter_oninput(e) { }
}
app.addonLoader.use({ name: "physics" });
app.addonLoader.use({ name: "gamepadAdapter" });
app.addonLoader.use({ name: "controller" });
app.systemManager.use(UnimplementedSystem);
app.systemManager.use(DuplicatedImplementation);
app.systemManager.use(ImplicitlyImplementedSystem);
app.systemManager.use(ExplicitlyImplementedSystem);
describe("EventBroker.subscribe()", () => {
    var eventName, systemName;
    const func = () => { app.eventBroker.subscribe(eventName, systemName); };
    it("Must throw an error if an invalid event name is provided", () => {
        eventName = "";
        expect(func).toThrow(Error(`[EventManager] invalid event name provided: it must be a non-empty string`));
    });
    it("Must throw an error if an unregistered system name is provided", () => {
        eventName = "genericEvent";
        systemName = "";
        expect(func).toThrow(Error(`[EventManager] system '${systemName}' not found.`));
        systemName = "nullSystem";
        expect(func).toThrow(Error(`[EventManager] system '${systemName}' not found.`));
    });
    it("Must throw an error if the system does not implement a handler method properly", () => {
        eventName = "genericEvent";
        systemName = "UnimplementedSystem";
        expect(func).toThrow(Error(`[EventManager] '${systemName}' does not implement a handler method for event ${eventName}`));
    });
    it("Must execute correctly if everything is correct", () => {
        eventName = "genericEvent";
        systemName = "ImplicitlyImplementedSystem";
        expect(func).not.toThrow();
    });
});
describe("EventBroker.subscribe() with event namespaces but no polymorfism (no events share name)", () => {
    var eventName, systemName;
    const func = () => { app.eventBroker.subscribe(eventName, systemName, "physics"); };
    it("Must throw an error if the system has a duplicated implementation", () => {
        eventName = "collision";
        systemName = "DuplicatedImplementation";
        expect(func).toThrow(Error(`[EventManager] '${systemName}' has duplicated handler methods for event ${eventName}'`));
    });
    it("Must execute correctly if system implements event handler without namespace", () => {
        eventName = "collision";
        systemName = "ImplicitlyImplementedSystem";
        expect(func).not.toThrow();
    });
    it("Must execute correctly if system implements event handler with namespace", () => {
        eventName = "collision";
        systemName = "ExplicitlyImplementedSystem";
        expect(func).not.toThrow();
    });
});
describe("EventBroker.subscribe() with event namespaces and polymorfism (atleast two contextually separated events share name)", () => {
    var eventName, systemName, namespace;
    const func = () => { app.eventBroker.subscribe(eventName, systemName, namespace); };
    it("Must throw an error if the system has does not implement an event handler with namespace", () => {
        eventName = "input";
        namespace = "gamepadAdapter";
        systemName = "ImplicitlyImplementedSystem";
        app.eventBroker.subscribe(eventName, systemName, "controller");
        expect(func).toThrow(Error(`[EventManager] '${systemName}' implements 'on${eventName}', which is ambiguous, please implement '${namespace}_on${eventName}' instead.`));
    });
    it("Must execute successfully if the system implements an event handler with namespace", () => {
        eventName = "input";
        namespace = "gamepadAdapter";
        systemName = "ExplicitlyImplementedSystem";
        app.eventBroker.subscribe(eventName, systemName, "controller");
        expect(func).not.toThrow();
    });
});
//# sourceMappingURL=subscribe.test.js.map