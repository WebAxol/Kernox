import { AddonLoader } from "./addon/AddonLoader.js";
import { KernoAddon } from "./addon/KernoAddon.js";
import { CollectionManager } from "./collection/CollectionManager.js";
import { EntityFactory } from "./entity/EntityFactory.js";
import { EventBroker } from "./event/EventBroker.js";
import { SystemManager } from "./system/SystemManager.js";
export declare class Kerno {
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
