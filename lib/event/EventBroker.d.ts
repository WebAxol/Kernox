import { Kernox } from "../Kernox";
export declare class EventBroker {
    private __kernox;
    private listeners;
    constructor(__kernox: Kernox);
    /**
     * Dispatches a native custom event.
     * @param eventName The name of the event to dispatch.
     * @param detail Optional payload.
     */
    dispatch(eventName: string, detail?: any): boolean;
    /**
     * Registers a handler function for a given event name.
     * @param eventName The event to listen to.
     * @param systemName Optional system identifier.
     */
    subscribe(eventName: string, systemName: string, namespace?: string): boolean;
    private lookForAmbiguity;
    private resolveImplicitNamespace;
}
