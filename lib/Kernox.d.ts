import { AddonLoader } from "./addon/AddonLoader";
import { KernoAddon } from "./addon/KernoxAddon";
import { CollectionManager } from "./collection/CollectionManager";
import { EntityFactory } from "./entity/EntityFactory";
import { EventBroker } from "./event/EventBroker";
import { SystemManager } from "./system/SystemManager";
import { LinearCollection } from "./collection/LinearCollection";
export declare class Kernox {
    private __entityFactory;
    private __collectionManager;
    private __systemManager;
    private __eventBroker;
    private __addonLoader;
    private frameCount;
    private paused;
    /**
     * Kernox's top-level method, it starts the execution loop triggering subordinate systems.
     */
    execute(): void;
    /**
     * Integrates an addon: a set of systems, prototypes, collections and event listeners bundled within an object.
     * @param addon
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
}
export { LinearCollection };
