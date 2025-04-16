export class AddonLoader {
    constructor(__kerno) {
        this.__kerno = __kerno;
        this.__namespaces = new Set();
    }
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
        if (addon.listeners)
            this.registerEventListeners(addon.listeners, name);
        this.namespaces.add(name);
    }
    get namespaces() {
        return this.__namespaces;
    }
    registerPrototypes(prototypes, namespace) {
        prototypes.forEach(proto => {
            this.__kerno.entityFactory.prototype(proto, namespace);
        });
    }
    registerCollections(collections, namespace) {
        collections.forEach(collection => {
            this.__kerno.collectionManager.use(collection, namespace);
        });
    }
    registerSystems(services, namespace) {
        services.forEach(service => {
            this.__kerno.systemManager.use(service, namespace);
        });
    }
    registerEventListeners(listeners, namespace) {
        const events = Object.keys(listeners);
        events.forEach((event) => {
            const services = listeners[event];
            services.forEach(service => this.__kerno.eventBroker.subscribe(event, service, namespace));
        });
    }
}
//# sourceMappingURL=AddonLoader.js.map