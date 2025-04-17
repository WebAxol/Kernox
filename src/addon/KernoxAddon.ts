import type { PrototypeSchema } from "../entity/PrototypeSchema.js";
import type { AbstractCollection } from "../collection/AbstractCollection.js";
import type { System } from "../system/System.js";

/**
 * Object containing resources related to a context:
 * 
 * @property {string} name : Namespace which uniquely identifies the addon from others. This field is mandatory.
 * @property {object[]} prototypes? : List of prototype objects; prototypes are templates to create entities with a schema.
 * @property {class[]} collections? : List of collection constructors: subclasses which extend AbstractCollection.
 * @property {object[]} dependancies? : List of other addons the current addon depends on.
 * @example
 * // Addon resources
 * import { playerPrototype, enemyPrototype } from '.setup/prototypes';
 * import { Players, Enemies, Renderables } from '.setup/collections';
 * import { RenderingSystem, RenderingSystem } from '.setup/systems';
 * 
 * // Third party addon
 * import externalAddon from "external";
 * 
 * const addon : KernoAddon {
 *     name : "example",
 *     prototypes : [ 
 *          // Implement 'PrototypeSchema<T>'
 *          playerPrototype, 
 *          enemyPrototype 
 *     ],
 *     collections : [ 
 *          // Derived from 'AbstractCollection' class
 *          Players, their names)
 *          Enemies, 
 *          Renderables 
 *     ],
 *     systems : [
 *          // Derived from 'System' class
 *          MovementSystem
 *          RenderingSystem
 *     ],
 *     dependancies : [ externalAddon ]
 * };
 */
export interface KernoAddon {
    name          : string;
    prototypes?   : PrototypeSchema<any>[];
    collections?  : (new (...args : any[]) => AbstractCollection)[];
    systems?      : (new (...args : any[]) => System)[];
    dependancies? : KernoAddon[];
}