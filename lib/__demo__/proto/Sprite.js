import { Vector2D } from "../utils/Vector2D.js";
;
export const spritePrototype = {
    name: "Sprite",
    attributes: {
        position: new Vector2D(0, 0),
        dimensions: new Vector2D(1, 1),
        url: "../assets/default.png"
    },
    collections: new Set(["Renderables"])
};
//# sourceMappingURL=Sprite.js.map