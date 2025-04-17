import { AddonLoader } from "./addon/AddonLoader.js";
import { CollectionManager } from "./collection/CollectionManager.js";
import { EntityFactory } from "./entity/EntityFactory.js";
import { EventBroker } from "./event/EventBroker.js";
import { SystemManager } from "./system/SystemManager.js";
import { LinearCollection } from "./collection/LinearCollection.js";
export class Kernox {
    constructor() {
        this.__entityFactory = new EntityFactory(this);
        this.__collectionManager = new CollectionManager(this);
        this.__systemManager = new SystemManager(this);
        this.__eventBroker = new EventBroker(this);
        this.__addonLoader = new AddonLoader(this);
        this.frameCount = 0;
        this.paused = false;
    }
    /**
     * Kernox's top-level method, it starts the execution loop triggering subordinate systems.
     */
    execute() {
        if (this.paused)
            return;
        requestAnimationFrame(() => this.execute());
        this.__systemManager.execute();
        this.frameCount++;
    }
    /**
     * Integrates an addon: a set of systems, prototypes, collections and event listeners bundled within an object.
     * @param addon
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
        return this.frameCount;
    }
}
export { LinearCollection };
//# sourceMappingURL=Kernox.js.map