// Generated by dts-bundle v0.7.3

/**
    * Top-level application component: central integration point that handles all resources, including entities,
    * collections, systems, and events.
    */
export class Kernox {
        /**
            * Kernox's top-level method, it starts the execution loop triggering subordinate systems.
            */
        execute(): void;
        /**
                * Integrates an 'addon' to the application instance, registering and setting up resources.
                * @param addon Object that packages resources belonging to a context: it can contain a list of systems, collections, event listeners
                * and entity prototypes, which will be registered.
                * @example
                * import { Kernox, KernoAddon } from "../../dist/kernox";
             
             const app = new Kernox();
    
             // Recommended setup structure:
             
             import { prototypes  }   from "./setup/prototypes";
             import { listeners   }   from "./setup/listeners";
             import { systems     }   from "./setup/systems";
             import { collections }   from "./setup/collections";
             
             // Resource bundler (Addon)
             
             const demoApp : KernoAddon = {
                     name : "demoApp",
                     prototypes,
                     systems,
                     collections,
                     listeners
             };
                        
            app.addonLoader.use(demoApp); // << Integrating addon to application
                */
        use(addon: KernoAddon): void;
        /**
            * Manages the construction and recycling of entities, and can assamble prototypes to define archetypes;
            * it creates an object pools for each archetype to allocate unused entities for posterior reusal.
            */
        get entityFactory(): EntityFactory;
        /**
            * Creates, retrieves and updates collections. A collection is a data structure containing entities; there are
            * several types of collections: linear (array), sorted (array), etc...
            */
        get collectionManager(): CollectionManager;
        /**
            * Vinculates and runs System instances sequentially.
            */
        get systemManager(): SystemManager;
        /**
            * Dispatches emitted events to subscribed systems, by calling their handler method.
            */
        get eventBroker(): EventBroker;
        get addonLoader(): AddonLoader;
        get frame(): number;
        get paused(): boolean;
}
export { LinearCollection };

export class AddonLoader {
        constructor(__kernox: Kernox);
        /**
            * Integrates an 'addon' to the application instance, registering and setting up resources.
            * @param addon Object that packages resources belonging to a context: it can contain a list of systems, collections, event listeners
            * and entity prototypes, which will be registered.
            * @example
            * import { Kernox, KernoAddon } from "../../dist/kernox";
         
         const app = new Kernox();

         // Recommended setup structure:
         
         import { prototypes  }   from "./setup/prototypes";
         import { listeners   }   from "./setup/listeners";
         import { systems     }   from "./setup/systems";
         import { collections }   from "./setup/collections";
         
         // Resource bundler (Addon)
         
         const demoApp : KernoAddon = {
                 name : "demoApp",
                 prototypes,
                 systems,
                 collections,
                 listeners
         };
                    
        app.use(demoApp); // << Integrating addon to application
            */
        use(addon: KernoAddon): void;
        /**
            * Retrieves all namespaces registered. A namespace indicates the context a resource belongs to: every addon has its own namespace,
            * which isolates their resources, preventing name collisions.
            * @returns A string set containing all namespaces
            * @example
            * import { Kernox, KernoAddon } from "../../dist/kernox";
            * const app = new Kernox();
            *
            * app.use({
            *     name : "physics"
            *     // ...
            * });
            *
            * app.use({
            *     name : "graphics"
            *     // ...
            * });
            *
            * app.addonLoader.namespaces(); // Set(2) { "physics", "graphics" }
         
            */
        get namespaces(): Set<string>;
}

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
    name: string;
    prototypes?: PrototypeSchema<any>[];
    collections?: (new (...args: any[]) => AbstractCollection)[];
    systems?: (new (...args: any[]) => System)[];
    dependancies?: KernoAddon[];
}

export class CollectionManager {
        constructor(__kernox: Kernox);
        /**
            * Searches for a collection by name and retrieves it if found.
            * @param collectionName Name of collection
            * @returns
            */
        get<T extends AbstractCollection>(collectionName: string): T;
        /**
            * Registers new collection based on a constructor; the collection is identified by the name of its parent class.
            * @param Ctr sub-class of AbstractCollection.
            * @param namespace Optional parameter used by AddonLoader to specify a context when loading collections from an addon.
            */
        use(Ctr: new () => AbstractCollection, namespace?: string): void;
        addEntityTo(entity: Entity, collectionName: string): void;
        removeEntityFrom(entity: Entity, collectionName: string): void;
        flushRemoved(): void;
}

export class EntityFactory {
    constructor(__kernox: Kernox);
    prototype(prototype: PrototypeSchema<any>, namespace?: string): void;
    create(type: string, params: object): Entity;
    copyFromPrototype(recipient: Entity, prototype: PrototypeSchema<any>): void;
    sendToRest(entity: Entity): void;
}

export type EventHandler = (event: any) => void;
export class EventBroker {
        constructor(__kernox: Kernox);
        /**
            * Dispatches an event to all listeners.
            * @param eventName The name of the event to dispatch.
            * @param detail Optional payload.
            * @example

            * import { app } from "./main"; // << Your application instance
            *
            * // Fire event...
            * app.eventBroker.dispatch("test", {
            *     message : "A test event was fired"
            * });
            *
            * // Note: you may call this method whenever something special happens at your systems
            */
        dispatch(eventName: string, detail?: any): boolean;
        /**
            * Subscribes function to a given event.
            * @param eventName The event to listen to.
            * @param handler Handler function which will be called when the event is fired
            * @example
            *
            * import { Kernox, System } from "kernox";
            *
            * const app = new Kernox(); // << Your application instance
            *
            * const onPlayerMove = (details) => {
            *     console.log("Event was fired", details);
            * };
            *
            * app.eventBroker.attachToEvent("playerMove", onPlayerMove);
            */
        attachToEvent(eventName: string, handler: EventHandler): boolean;
}

export class SystemManager {
        constructor(__kernox: Kernox);
        /**
            * @description Executes all systems sequentially.
            * Systems are executed in the order they were registered.
            */
        execute(): void;
        /**
            * @description Vinculates a system, so that it's execution method is called on every frame.
            * @param system An instance of 'System'.
            * @returns True if new system is registered, false otherwise.
            */
        use(Ctor: new (kernox: Kernox, context: string) => System, namespace?: string): boolean;
        /**
            * Removes system from the execution list and registry.
            * @param systemName A string corresponding to the class of the system to remove.
            */
        unuse(systemName: string): void;
        get<T extends System>(systemName: string): T | undefined;
}

export class LinearCollection extends AbstractCollection {
    protected readonly entities: Set<Entity>;
    protected __changed: boolean;
    insert(entity: Entity): void;
    remove(entity: Entity): void;
    has(entity: Entity): boolean;
    iterate(callback: (entity: Entity) => void): void;
    filter(criteria: (entity: Entity) => boolean): Entity[];
    get changed(): boolean;
}

export interface PrototypeSchema<TypeSchema> {
    name: string;
    attributes: TypeSchema;
    collections?: Set<string>;
    inherits?: PrototypeSchema<any>[];
}

export abstract class AbstractCollection {
    protected abstract entities: unknown;
    protected abstract __changed: boolean;
    abstract insert(entity: Entity): void;
    abstract remove(entity: Entity): void;
    abstract iterate(callback: Function): void;
}

/**
    * Encapsulates application logic which is part of kernox's execution loop.
    *
    * Systems are firt-class-citizens: they can emit and listen to events, request and update collections,
    * and process entities.
    */
export class System {
        protected __paused: boolean;
        constructor(__kernox: Kernox, __context: string);
        /**
            * Called once during addon setup.
            */
        init(): void;
        /**
            * Method called by kernox on every frame, when paused is false.
            */
        execute(): void;
        /**
            * Name of the addon the system is related to.
            */
        get context(): string;
        /**
            * Prevents the execution of the system when true.
            */
        get paused(): boolean;
        set paused(state: boolean);
        /**
            * Attaches callback to an event, so it is called whenever the event is emitted.
            *
            * Note: By default, the system's context is assumed, unless a namespace is defined (ex. eventName = 'physics.collision').
            * @param eventName Name of the event (it is registered if not yet).
            * @param callback Handler function that receives one parameter.
            * @returns True if attachment was successfull, false otherwise.
            * @example
            *
            * import { System } from "kernox";
            *
            * class MovementSystem extends System {
            *
            *    public init(){
            *       this.attachToEvent("playerInput", this.onPlayerInput)
            *    };
            *
            *    public execute(){
            *      // Etc...
            *    }
            *
            *    public onPlayerInput(details){
            *       console.log("The player interacted", details);
            *    }
            * };
            */
        attachToEvent(eventName: string, handler: EventHandler): boolean;
        /**
            * Notifies an event to the EventBroker.
            *
            * Note: By default, the system's context is assumed, unless a namespace is defined (ex. eventName = 'physics.collision').
            * @param eventName Name of the event.
            * @param details Additional information related to the event.
            * @example
            * import { System } from "kernox";
            * import { player } from "./player";
            *
            * class MovementSystem extends System {
            *
            *    public init(){
            *       this.attachToEvent("playerInput", this.onPlayerInput)
            *    };
            *
            *    public execute(){
            *      if(player.jumped) this.dispatchEvent("playerJump", { player });
            *      // Event triggered when player jumps ^^^
            *    }
            * };
            */
        protected dispatchEvent(eventName: string, details: object): void;
        /**
            * Retrieves a collection to CollectionManager if found.
            * @param collectionName Name of collection
            * @returns an entitity collection or undefined
            */
        protected getCollection<T extends AbstractCollection>(collectionName: string): T;
}

/**
  * First class citizen object whose attributes can be inherited from n other entity types, can be
  * subscribed to entity collections and processed by other functions or class methods. It does not contain behaviour appart from getters and state validators.
  */
export class Entity {
    constructor(__ID: string, __TYPE: string);
    get id(): string;
    get type(): string;
    belongsTo(collectionName: string): boolean;
    collections(): Set<string>;
    linkTo(collectionName: string): void;
    unlinkFrom(collectionName: string): void;
    appendChild(name: string, child: Entity): void;
    getChild(name: string): Entity | undefined;
    deleteChild(name: string): void;
}

