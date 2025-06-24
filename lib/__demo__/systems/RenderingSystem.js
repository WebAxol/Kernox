import { System } from "../../system/System.js";
export class RenderingSystem extends System {
    init() {
        // Define rendering context
        const ctx = document.querySelector("canvas")?.getContext("2d");
        if (!ctx)
            throw Error("Could not prepare rendering context");
        this.ctx = ctx;
        // Dependancy injection during application setup
        this.renderables = this.getCollection("Renderables");
    }
    // Called each frame
    execute() {
        this.ctx.clearRect(0, 0, 1000, 500);
        for (const entity of this.renderables) {
            this.ctx.beginPath();
            this.ctx.arc(entity.position.x, entity.position.y, entity.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = entity.color;
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = 'black';
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}
;
//# sourceMappingURL=RenderingSystem.js.map