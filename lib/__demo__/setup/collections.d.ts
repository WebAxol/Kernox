import { ArrayList } from '../../collection/ArrayList.js';
import { Circle } from '../proto/Circle.js';
import { Kinetic } from '../proto/Kinetic.js';
export declare class Kinetics extends ArrayList<Kinetic> {
}
export declare class Renderables extends ArrayList<Circle> {
}
export declare const collections: (typeof Kinetics | typeof Renderables)[];
