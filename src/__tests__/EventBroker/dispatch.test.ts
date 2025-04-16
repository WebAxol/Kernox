import { EventBroker } from "../../event/EventBroker.js";
import { Kernox } from "../../Kernox.js";
import { System } from "../../system/System.js";

const app = new Kernox();

var receptor;

class ImplementedSystem extends System {
    ongenericEvent(event){
        receptor = { handler : "ImplementedSystem", data : event };;
    }
}

class PlayerMovementSystem extends System {
    physics_oninput(event){
        receptor = { handler : "PlayerMovement", data : event };
    }
}

class HudUpdaterSystem extends System {
    hud_oninput(event){
        receptor = { handler : "HudUpdaterSystem", data : event };;
    }
};

app.addonLoader.use({ name : "physics" });
app.addonLoader.use({ name : "hud" });

app.systemManager.use(ImplementedSystem);
app.systemManager.use(PlayerMovementSystem);
app.systemManager.use(HudUpdaterSystem);

app.eventBroker.subscribe("genericEvent","ImplementedSystem");
app.eventBroker.subscribe("physics.input","PlayerMovementSystem");
app.eventBroker.subscribe("hud.input","HudUpdaterSystem");


describe("EventBroker.dispatch() with no polimorphism (no two contextually separated events share the same name)", () => {

    var eventName, details;
    const func = () => { app.eventBroker.dispatch(eventName,details) };

    it("Must call the handler method with 'details' as argument", () => {
        eventName = "genericEvent";
        details = { data : "Hello world" }
        expect(func).not.toThrow();
        expect(receptor.handler).toBe("ImplementedSystem");
        expect(receptor.data).toEqual(details);
    });
});
