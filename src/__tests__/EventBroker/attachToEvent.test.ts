import { EventBroker } from "../../event/EventBroker.js";
import type { Kernox } from "../../Kernox.js";

const eventBroker = new EventBroker({} as Kernox);

describe("EventBroker.subscribe()", () => {

    var eventName, handler;
    const func = () => { eventBroker.attachToEvent(eventName,handler) };

    it("Must throw an error if an invalid event name is provided", () => {
        eventName = "";
        expect(func).toThrow( Error(`[EventManager] invalid event name provided: it must be a non-empty string`));
    });

    it("Must throw an error if argument 'handler' is not a function", () => {
        eventName = "genericEvent";
        handler = "Not a function"; // Empty string
        expect(func).toThrow( Error("Expected function as 'handler'"));
    });

    it("Must execute correctly if everything is correct", () => {
        eventName  = "genericEvent";
        handler = (details) => {};
        expect(func).not.toThrow();
    });
});