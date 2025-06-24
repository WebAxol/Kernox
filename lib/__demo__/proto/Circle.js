import { Vector2D } from "../utils/Vector2D.js";
import { kineticPrototype } from "./Kinetic.js";
;
export const circlePrototype = {
    name: "Circle",
    attributes: {
        position: new Vector2D(0, 0),
        radius: 1,
        color: "rgb(255,0,0)"
    },
    inherits: [kineticPrototype], // Circle extends Kinetic
    collections: new Set(["Renderables"])
};
//# sourceMappingURL=Circle.js.map