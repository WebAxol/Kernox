import { kineticPrototype } from "./Kinetic.js";
import { spritePrototype } from "./Sprite.js";
;
export const avatarPrototype = {
    name: "Avatar",
    attributes: {
        hp: 20,
        level: 1,
        active: false
    },
    collections: new Set(["Avatars"]),
    // Multiple inheritance:
    inherits: [
        kineticPrototype,
        spritePrototype
    ]
};
//# sourceMappingURL=Avatar.js.map