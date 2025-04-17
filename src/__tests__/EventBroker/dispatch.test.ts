import { EventBroker } from "../../event/EventBroker.js";
import { Kernox } from "../../Kernox.js";

const app = new Kernox();

var receptor;

app.eventBroker.attachToEvent("genericEvent",(detail) => {
    receptor = { event : "genericEvent", data : detail  };
});

app.eventBroker.attachToEvent("physics.collision", (detail) => {
    receptor = { event : "physics.collision", data : detail  };
});

app.eventBroker.attachToEvent("physics.input", (detail) => {
    receptor = { event : "physics.input", data : detail  };
});

app.eventBroker.attachToEvent("graphics.input", (detail) => {
    receptor = { event : "graphics.input", data : detail  };
});

app.use({ name : "physics" });
app.use({ name : "graphics" });

describe("EventBroker.dispatch()", () => {

    var eventName, details;
    const func = () => { app.eventBroker.dispatch(eventName,details) };

    it("Must call the handler method with 'details' as argument", () => {
        eventName = "genericEvent";
        details = { data : "Hello world" }
        expect(func).not.toThrow();
        expect(receptor.event).toBe("genericEvent");
        expect(receptor.data).toEqual(details);
    });

    it("Must resolve method with implicit namespace", () => {
        eventName = "collision";
        details = { item : {} }
        expect(func).not.toThrow();
        expect(receptor.event).toBe("physics.collision");
        expect(receptor.data).toEqual(details);
    });

    it("Must throw an error if eventName is ambiguous", () => {
        eventName = "input";
        details = { w : true, a : false, s : true, d : false }
        expect(func).toThrow(Error(`Ambiguous event '${eventName}' was requested: a namespace must be specified before it ( Ex. namespace.eventName ).`));
    });
});
