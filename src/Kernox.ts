import { AddonLoader }       from "./addon/AddonLoader.js";
import { KernoAddon }        from "./addon/KernoxAddon.js";
import { CollectionManager } from "./collection/CollectionManager.js";
import { EntityFactory }     from "./entity/EntityFactory.js";
import { EventBroker }       from "./event/EventBroker.js";
import { SystemManager }     from "./system/SystemManager.js";
import { LinearCollection }  from "./collection/LinearCollection.js";

/**
 * Top-level application component: central integration point that handles all resources, including entities, 
 * collections, systems, and events.
 */
export class Kernox {

    private __entityFactory     = new EntityFactory(this);
    private __collectionManager = new CollectionManager(this);
    private __systemManager     = new SystemManager(this);
    private __eventBroker       = new EventBroker(this);
    private __addonLoader       = new AddonLoader(this);
    
    private __frame = 0;
    private __paused = false;
    private __lastTime = 0;
    private __dt  = 1;
    private __fps = 0;

    /**
     * Kernox's top-level method, it starts the execution loop triggering subordinate systems.
     */

    public execute(timeSpan = 30) : void {

        if(this.paused) return;

        this.__dt = timeSpan - this.__lastTime; 
        this.__fps = 1000 / this.dt;
        this.__lastTime = timeSpan;

        requestAnimationFrame((timeSpan) => this.execute(timeSpan) );
        
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
        return this.__frame;
    }

    public get paused(){
        return this.__paused;
    }

    public get dt(){
        return this.__dt;
    }

    public get fps(){
        return this.__fps;
    }
}

export { LinearCollection };