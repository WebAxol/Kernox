import { AddonLoader } from "./addon/AddonLoader.js";
import { KernoAddon } from "./addon/KernoxAddon.js";
import { CollectionManager } from "./collection/CollectionManager.js";
import { EntityFactory } from "./entity/EntityFactory.js";
import { EventBroker } from "./event/EventBroker.js";
import { SystemManager } from "./system/SystemManager.js";
import { LinearCollection }  from "./collection/LinearCollection.js";

export class Kernox {

    private __entityFactory     = new EntityFactory(this);
    private __collectionManager = new CollectionManager(this);
    private __systemManager     = new SystemManager(this);
    private __eventBroker       = new EventBroker(this);
    private __addonLoader       = new AddonLoader(this);
    
    private frameCount = 0;
    private paused = false;

    /**
     * Kernox's top-level method, it starts the execution loop triggering subordinate systems.
     */

    public execute() : void {

        if(this.paused) return;

        requestAnimationFrame(() => this.execute() );
        
        this.__systemManager.execute();
        this.frameCount++;
    }

    /**
     * Integrates an addon: a set of systems, prototypes, collections and event listeners bundled within an object.
     * @param addon
     */
    public use(addon : KernoAddon) : void {
          this.__addonLoader.use(addon);
    } 

    /**
     * Manages the construction and recycling of entities, and can assamble prototypes to define archetypes;
     * it creates an object pools for each archetype to allocate unused entities for posterior reusal. 
     */
    public get entityFactory(){
        return this.__entityFactory;
    }

    /**
     * Creates, retrieves and updates collections. A collection is a data structure containing entities; there are
     * several types of collections: linear (array), sorted (array), etc...
     */
    public get collectionManager(){
        return this.__collectionManager;
    }

    /**
     * Vinculates and runs System instances sequentially.
     */
    public get systemManager(){
        return this.__systemManager;
    }

    /**
     * Dispatches emitted events to subscribed systems, by calling their handler method.
     */ 
    public get eventBroker(){
        return this.__eventBroker;
    }

    public get addonLoader(){
        return this.__addonLoader;
    }

    public get frame(){
        return this.frameCount;
    }
}

export { LinearCollection };