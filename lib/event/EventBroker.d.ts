import { Kernox } from "../Kernox";
export type EventHandler = (event: any) => void;
export declare class EventBroker {
    private __kernox;
    private listeners;
    constructor(__kernox: Kernox);
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
    dispatch(eventName: string, detail?: any): boolean;
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
    attachToEvent(eventName: string, handler: EventHandler): boolean;
    private resolveImplicitNamespace;
}
