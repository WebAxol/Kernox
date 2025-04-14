import { Kerno } from "../Kerno.js";
import { System } from "../system/System.js";

type EventHandler = (event: any) => void;

export class EventBroker{

    private listeners : Map<string,Set<Function>> = new Map();

    constructor( private __kerno : Kerno ){}

    /**
     * Dispatches a native custom event.
     * @param eventName The name of the event to dispatch.
     * @param detail Optional payload.
     */
    public dispatch(eventName: string, detail?: any): boolean {

        const listeners = this.listeners[eventName];

        if(!listeners) return false;

        for(const handler of listeners) handler(detail);
    
        return true;
    }

    /**
     * Registers a handler function for a given event name.
     * @param eventName The event to listen to.
     * @param systemName Optional system identifier.
     */
    public subscribe(eventName: string, systemName: string): boolean {
        const system = this.__kerno.systemManager.get(systemName);

        if(!eventName || typeof eventName != "string"){
            throw new Error(`[EventManager] invalid event name provided: it must be a non-empty string`);
        }

        if (!system) {
            throw new Error(`[EventManager] system '${systemName}' not found.`);
        }

        const methodName = `on${eventName}`;
        if (typeof system[methodName] !== 'function') {
            throw new Error(`[EventManager] '${systemName}' does not implement '${methodName}'`);
        }

        const handlerFn: EventHandler = (detail) => {
            system[methodName]?.(detail);
        };

    
        if(!this.listeners[eventName]) this.listeners[eventName] = new Set();

        const listeners :Set<Function> = this.listeners[eventName];

        listeners.add(handlerFn);

        return true;
    }
}
