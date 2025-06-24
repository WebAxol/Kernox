import { Kernox } from "../Kernox";
import { KernoAddon } from "./KernoxAddon";
export declare class AddonLoader {
    private __kernox;
    private __namespaces;
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
    private registerPrototypes;
    private registerCollections;
    private registerSystems;
}
