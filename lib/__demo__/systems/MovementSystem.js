import { System } from "../../system/System.js";
export class MovementSystem extends System {
    init() {
        // Dependancy injection during application setup
        this.kinetics = this.getCollection("Kinetics");
    }
    // Called each frame
    execute() {
        // Collections are iterable
        for (const entity of this.kinetics) {
            // Entities contain data, and are updated by systems
            entity.position.x += entity.velocity.x * ((1000 / 60) / this.__kernox.dt);
            entity.position.y += entity.velocity.y * ((1000 / 60) / this.__kernox.dt);
        }
        ;
    }
}
;
//# sourceMappingURL=MovementSystem.js.map