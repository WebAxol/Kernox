import { Kernox } from "../Kernox.js";
import { KernoAddon } from "./KernoxAddon.js";
export declare class AddonLoader {
    private __kernox;
    private __namespaces;
    constructor(__kernox: Kernox);
    use(addon: KernoAddon): void;
    get namespaces(): Set<string>;
    private registerPrototypes;
    private registerCollections;
    private registerSystems;
    private registerEventListeners;
}
