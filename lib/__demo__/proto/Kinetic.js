import { spatialPrototype } from "./Spatial.js";
;
export const kineticPrototype = {
    name: "Spatial",
    attributes: {
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 }
    },
    inherits: [spatialPrototype],
    collections: new Set(["Kinetics"])
};
//# sourceMappingURL=Kinetic.js.map