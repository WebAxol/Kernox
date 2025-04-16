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
    collections: new Set(["Kinetics"])
};
;
export const circlePrototype = {
    name: "Circle",
    attributes: {
        position: { x: 0, y: 0 },
        radius: 1,
    },
    collections: new Set(["Circles"])
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
    collections: new Set(["Enemies"])
};
;
export const playerPrototype = {
    name: "Player",
    attributes: {
        lifes: 3,
        score: 0,
        hp: 100
    },
    inherits: [
        kineticPrototype,
        circlePrototype
    ]
};
;
export const corpsePrototype = {
    name: "Corpse",
    attributes: {
        loot: []
    },
    inherits: [
        spatialPrototype,
        circlePrototype
    ],
    collections: new Set(["Dead"])
};
//# sourceMappingURL=entityPrototypes.js.map