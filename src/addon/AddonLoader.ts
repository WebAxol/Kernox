import { Kernox } from "../Kernox.js";
import { KernoAddon } from "./KernoxAddon.js";
import { PrototypeSchema } from "../entity/PrototypeSchema.js";
import { AbstractCollection } from "../collection/AbstractCollection.js";
import { System } from "../system/System.js";

export class AddonLoader {

    private __namespaces : Set<string> = new Set();

    constructor( private __kernox : Kernox ){}

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
          
    app.use(demoApp); // << Integrating addon to application
     */

    public use(addon : KernoAddon){
        
        const { name } = addon;

        if(this.namespaces.has(name)){
            throw new Error(`Conflict with already existing namespace '${name}', please consider renaming one of them.`);
        }

        if(addon.collections) this.registerCollections(addon.collections,name);
        if(addon.prototypes)  this.registerPrototypes(addon.prototypes,name);
        if(addon.systems)     this.registerSystems(addon.systems,name);

        this.namespaces.add(name);
    }

    /**
     * Retrieves all namespaces registered. A namespace indicates the context a resource belongs to: every addon has its own namespace,
     * which isolates their resources, preventing name collisions.
     * @returns A string set containing all namespaces
     * @example
     * import { Kernox, KernoAddon } from "../../dist/kernox.js";
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

    public get namespaces(){
        return this.__namespaces;
    }

    private registerPrototypes(prototypes : PrototypeSchema<any>[], namespace : string){
        prototypes.forEach(proto => {
            this.__kernox.entityFactory.prototype(proto,namespace);
        });
    }
    
    private registerCollections(collections : (new () => AbstractCollection)[], namespace : string){
        collections.forEach(collection => {
            this.__kernox.collectionManager.use(collection, namespace);
        });
    }

    private registerSystems(services : (new () => System)[], namespace : string){
        services.forEach(service => {
            this.__kernox.systemManager.use(service, namespace);
        });
    }
}