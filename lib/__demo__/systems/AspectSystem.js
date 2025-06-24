import { System } from "../../system/System.js";
export class AspectSystem extends System {
    init() {
        // Subscription to event 'collision', which will be triggered by 'CollisionSystem'
        this.attachToEvent("collision", (e) => { this.oncollision(e); });
    }
    oncollision(e) {
        // Randomly change color when circles collide with each other
        e.obj1.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        e.obj2.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    }
}
;
//# sourceMappingURL=AspectSystem.js.map