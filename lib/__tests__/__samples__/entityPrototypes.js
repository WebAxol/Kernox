;
export const spatialPrototype = {
    name: "Spatial",
    attributes: {
        position: { x: 0, y: 0 },
        orientation: { x: 1, y: 0 },
    }
};
;
export const kineticPrototype = {
    name: "Kinetic",
    attributes: {
        mass: 10,
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 }
    },
    inherits: [spatialPrototype],
    collections: new Set(["kinetics"])
};
;
export const circlePrototype = {
    name: "Circle",
    attributes: {
        position: { x: 0, y: 0 },
        radius: 1,
    },
    collections: new Set(["circles"])
};
;
export const enemyPrototype = {
    name: "Enemy",
    attributes: {
        hp: 100,
        damage: 10,
        loot: ["Sword", "Gold"]
    },
    inherits: [
        kineticPrototype,
        circlePrototype
    ],
    collections: new Set(["enemies"])
};
//# sourceMappingURL=entityPrototypes.js.map