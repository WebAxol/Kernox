export class AddonLoader {
    constructor(__kernox) {
        this.__kernox = __kernox;
        this.__namespaces = new Set();
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
          
    app.use(demoApp); // << Integrating addon to application
     */
    use(addon) {
        const { name } = addon;
        if (this.namespaces.has(name)) {
            throw new Error(`Conflict with already existing namespace '${name}', please consider renaming one of them.`);
        }
        if (addon.collections)
            this.registerCollections(addon.collections, name);
        if (addon.prototypes)
            this.registerPrototypes(addon.prototypes, name);
        if (addon.systems)
            this.registerSystems(addon.systems, name);
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
    get namespaces() {
        return this.__namespaces;
    }
    registerPrototypes(prototypes, namespace) {
        prototypes.forEach(proto => {
            this.__kernox.entityFactory.prototype(proto, namespace);
        });
    }
    registerCollections(collections, namespace) {
        collections.forEach(collection => {
            this.__kernox.collectionManager.use(collection, namespace);
        });
    }
    registerSystems(services, namespace) {
        services.forEach(service => {
            this.__kernox.systemManager.use(service, namespace);
        });
    }
}
//# sourceMappingURL=AddonLoader.js.map