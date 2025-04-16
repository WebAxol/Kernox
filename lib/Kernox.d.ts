import { AddonLoader } from "./addon/AddonLoader";
import { KernoAddon } from "./addon/KernoxAddon";
import { CollectionManager } from "./collection/CollectionManager";
import { EntityFactory } from "./entity/EntityFactory";
import { EventBroker } from "./event/EventBroker";
import { SystemManager } from "./system/SystemManager";
export declare class Kernox {
    private __entityFactory;
    private __collectionManager;
    private __systemManager;
    private __eventBroker;
    private __addonLoader;
    private frameCount;
    private paused;
    execute(): void;
    use(addon: KernoAddon): void;
    get entityFactory(): EntityFactory;
    get collectionManager(): CollectionManager;
    get systemManager(): SystemManager;
    get eventBroker(): EventBroker;
    get addonLoader(): AddonLoader;
    get frame(): number;
}
