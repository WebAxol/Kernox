import { System } from '../../../dist/kernox.js';
export class MovementSystem extends System {
    init() {
        // Dependancy injection during application setup
        this.kinetics = this.getCollection("Kinetics");
    }
    execute() {
        // Called each frame
        this.kinetics.iterate((entity) => {
            entity.position.x += entity.velocity.x;
            entity.position.y += entity.velocity.y;
        });
    }
}
//# sourceMappingURL=MovementSystem.js.map