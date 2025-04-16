import { Kerno } from "../Kerno.js";
import { KernoAddon } from "./KernoAddon.js";
export declare class AddonLoader {
    private __kerno;
    private __namespaces;
    constructor(__kerno: Kerno);
    use(addon: KernoAddon): void;
    get namespaces(): Set<string>;
    private registerPrototypes;
    private registerCollections;
    private registerSystems;
    private registerEventListeners;
}
