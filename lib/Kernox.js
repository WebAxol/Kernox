import { AddonLoader } from "./addon/AddonLoader.js";
import { CollectionManager } from "./collection/CollectionManager.js";
import { EntityFactory } from "./entity/EntityFactory.js";
import { EventBroker } from "./event/EventBroker.js";
import { SystemManager } from "./system/SystemManager.js";
export class Kernox {
    constructor() {
        this.__entityFactory = new EntityFactory(this);
        this.__collectionManager = new CollectionManager(this);
        this.__systemManager = new SystemManager(this);
        this.__eventBroker = new EventBroker(this);
        this.__addonLoader = new AddonLoader(this);
        this.frameCount = 0;
        this.paused = false;
    }
    execute() {
        if (this.paused)
            return;
        requestAnimationFrame(() => this.execute());
        this.__systemManager.execute();
        this.frameCount++;
    }
    use(addon) {
        this.__addonLoader.use(addon);
    }
    get entityFactory() {
        return this.__entityFactory;
    }
    get collectionManager() {
        return this.__collectionManager;
    }
    get systemManager() {
        return this.__systemManager;
    }
    get eventBroker() {
        return this.__eventBroker;
    }
    get addonLoader() {
        return this.__addonLoader;
    }
    get frame() {
        return this.frameCount;
    }
}
//# sourceMappingURL=Kernox.js.map