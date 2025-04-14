import { EventBroker } from "../../event/EventBroker.js";
import { Kerno } from "../../Kerno.js";
import { System } from "../../system/System.js";

const app = new Kerno();

class UnimplementedSystem extends System {
    // Empty implementation
}

class ImplementedSystem extends System {
    ongenericEvent(event){
        console.log(event);
    }
}

app.systemManager.use(UnimplementedSystem);
app.systemManager.use(ImplementedSystem);

describe("EventBroker.subscribe()", () => {

    var eventName, systemName, res;
    const func = () => { 
        res = undefined;
        res = app.eventBroker.subscribe(eventName,systemName) 
    };

    it("Must throw an error if an invalid event name is provided", () => {
        eventName = "";
        expect(func).toThrow( Error(`[EventManager] invalid event name provided: it must be a non-empty string`));
    });

    it("Must throw an error if an unregistered system name is provided", () => {
        eventName = "genericEvent";
        systemName = ""; // Empty string
        expect(func).toThrow( Error(`[EventManager] system '${systemName}' not found.`));
        systemName = "nullSystem"; // Unrecognized system name
        expect(func).toThrow( Error(`[EventManager] system '${systemName}' not found.`));
    });

    it("Must throw an error if the system does not implement a handler method properly", () => {
        eventName  = "genericEvent";
        systemName = "UnimplementedSystem";
        expect(func).toThrow( Error(`[EventManager] '${systemName}' does not implement 'on${eventName}'`));
    });

    it("Nust execute correctly if everything is correct", () => {
        eventName  = "genericEvent";
        systemName = "ImplementedSystem";
        expect(func).not.toThrow();
    });


});