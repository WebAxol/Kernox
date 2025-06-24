import { kineticPrototype } from "../proto/Kinetic.js";
import { circlePrototype } from "../proto/Circle.js";

// Just like with systems and collections, we bundle prototypes to integrate them into the addon

export const prototypes = [
    kineticPrototype,
    circlePrototype
];