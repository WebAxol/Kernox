import { AddonLoader } from "./addon/AddonLoader.js";
import { CollectionManager } from "./collection/CollectionManager.js";
import { EntityFactory } from "./entity/EntityFactory.js";
import { EventBroker } from "./event/EventBroker.js";
import { SystemManager } from "./system/SystemManager.js";
import { LinearCollection } from "./collection/LinearCollection.js";
/**
 * Top-level application component: central integration point that handles all resources, including entities,
 * collections, systems, and events.
 */
export class Kernox {
    constructor() {
        this.__entityFactory = new EntityFactory(this);
        this.__collectionManager = new CollectionManager(this);
        this.__systemManager = new SystemManager(this);
        this.__eventBroker = new EventBroker(this);
        this.__addonLoader = new AddonLoader(this);
        this.__frame = 0;
        this.__paused = false;
    }
    /**
     * Kernox's top-level method, it starts the execution loop triggering subordinate systems.
     */
    execute() {
        if (this.paused)
            return;
        requestAnimationFrame(() => this.execute());
        this.__systemManager.execute();
        this.__frame++;
    }
    /**
       * Integrates an 'addon' to the application instance, registering and setting up resources.
       * @param addon Object that packages resources belonging to a context: it can contain a list of systems, collections, event listeners
       * and entity prototypes, which will be registered.
       * @example
       * import { Kernox, KernoAddon } from "../../dist/kernox.js";
       
       const app = new Kernox();
  
       // Recommended setup structure:
       
       import { prototypes  }   from "./setup/prototypes.js";
       import { listeners   }   from "./setup/listeners.js";
       import { systems     }   from "./setup/systems.js";
       import { collections }   from "./setup/collections.js";
       
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
    use(addon) {
        this.__addonLoader.use(addon);
    }
    /**
     * Manages the construction and recycling of entities, and can assamble prototypes to define archetypes;
     * it creates an object pools for each archetype to allocate unused entities for posterior reusal.
     */
    get entityFactory() {
        return this.__entityFactory;
    }
    /**
     * Creates, retrieves and updates collections. A collection is a data structure containing entities; there are
     * several types of collections: linear (array), sorted (array), etc...
     */
    get collectionManager() {
        return this.__collectionManager;
    }
    /**
     * Vinculates and runs System instances sequentially.
     */
    get systemManager() {
        return this.__systemManager;
    }
    /**
     * Dispatches emitted events to subscribed systems, by calling their handler method.
     */
    get eventBroker() {
        return this.__eventBroker;
    }
    get addonLoader() {
        return this.__addonLoader;
    }
    get frame() {
        return this.__frame;
    }
    get paused() {
        return this.__paused;
    }
}
export { LinearCollection };
//# sourceMappingURL=Kernox.js.map