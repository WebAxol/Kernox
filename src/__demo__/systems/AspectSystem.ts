import { System } from "../../system/System.js";
import { Renderables } from "../setup/collections.js";

export class AspectSystem extends System {
  
    private renderables! : Renderables;

    public init() : void {
        // Subscription to event 'collision', which will be triggered by 'CollisionSystem'
        this.attachToEvent("collision", (e) => { this.oncollision(e) });
    }

    private oncollision(e : any){
        // Randomly change color when circles collide with each other
        e.obj1.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
        e.obj2.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }
};