import { kineticPrototype } from "./Kinetic.js";
import { armedPrototype } from "./Armed.js";
;
export const playerPrototype = {
    name: "Player",
    attributes: {
        hp: 100,
        level: 1,
        name: "Default"
    },
    collections: new Set(["Players"]),
    inherits: [
        kineticPrototype,
        armedPrototype
    ]
};
//# sourceMappingURL=Player.js.map