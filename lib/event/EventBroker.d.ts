import { Kernox } from "../Kernox.js";
export declare class EventBroker {
    private __kernox;
    private listeners;
    constructor(__kernox: Kernox);
    dispatch(eventName: string, detail?: any): boolean;
    subscribe(eventName: string, systemName: string, namespace?: string): boolean;
    private lookForAmbiguity;
    private resolveImplicitNamespace;
}
