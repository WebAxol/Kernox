export class EventBroker {
    constructor(__kerno) {
        this.__kerno = __kerno;
        this.listeners = new Map();
    }
    dispatch(eventName, detail) {
        const listeners = this.listeners[eventName];
        if (!listeners)
            return false;
        for (const handler of listeners)
            handler(detail);
        return true;
    }
    subscribe(eventName, systemName) {
        const system = this.__kerno.systemManager.get(systemName);
        if (!eventName || typeof eventName != "string") {
            throw new Error(`[EventManager] invalid event name provided: it must be a non-empty string`);
        }
        if (!system) {
            throw new Error(`[EventManager] system '${systemName}' not found.`);
        }
        const methodName = `on${eventName}`;
        if (typeof system[methodName] !== 'function') {
            throw new Error(`[EventManager] '${systemName}' does not implement '${methodName}'`);
        }
        const handlerFn = (detail) => {
            system[methodName]?.(detail);
        };
        if (!this.listeners[eventName])
            this.listeners[eventName] = new Set();
        const listeners = this.listeners[eventName];
        listeners.add(handlerFn);
        return true;
    }
}
//# sourceMappingURL=EventBroker.js.map