import { Kernox } from "../Kernox.js";

export type EventHandler = (event: any) => void;

export class EventBroker{

    private listeners : Map<string,Set<Function>> = new Map();

    constructor( private __kernox : Kernox ){}

    /**
     * Dispatches an event to all listeners.
     * @param eventName The name of the event to dispatch.
     * @param detail Optional payload.
     * @example

     * import { app } from "./main"; // << Your application instance
     *  
     * // Fire event...
     * app.eventBroker.dispatch("test", { 
     *     message : "A test event was fired" 
     * });
     * 
     * // Note: you may call this method whenever something special happens at your systems
     */
    public dispatch(eventName: string, detail?: any): boolean {

        const listeners = this.listeners[eventName] || this.resolveImplicitNamespace(eventName);

        if(!listeners) return false;

        for(const handler of listeners) handler(detail);
    
        return true;
    }

    /**
     * Subscribes function to a given event.
     * @param eventName The event to listen to.
     * @param handler Handler function which will be called when the event is fired
     * @example
     * 
     * import { Kernox, System } from "kernox";
     * 
     * const app = new Kernox(); // << Your application instance
     *  
     * const onPlayerMove = (details) => {
     *     console.log("Event was fired", details);
     * };
     * 
     * app.eventBroker.attachToEvent("playerMove", onPlayerMove);
     */
    public attachToEvent(eventName: string, handler : EventHandler): boolean {
        
        if(!eventName || typeof eventName != "string"){
            throw new Error(`[EventManager] invalid event name provided: it must be a non-empty string`);
        }

        if (typeof handler !== "function") {
            throw new Error(`Expected function as 'handler'`);
        }
    
        if(!this.listeners[eventName]) this.listeners[eventName] = new Set();

        return this.listeners[eventName].add(handler);
    }

    private resolveImplicitNamespace(eventName : string) : string | undefined {
        const namespaces = this.__kernox.addonLoader.namespaces;
        
        var resolved, resource;

        for(const namespace of namespaces){
            resource = this.listeners[`${namespace}.${eventName}`];
            if(resource && !resolved) resolved = resource;
            else if(resource){ 
                throw new Error(`Ambiguous event '${eventName}' was requested: a namespace must be specified before it ( Ex. namespace.eventName ).`);
            }
        }

        return resolved;
    }
}
