import { Kerno } from "../Kerno.js";
export declare class EventBroker {
    private __kerno;
    private listeners;
    constructor(__kerno: Kerno);
    dispatch(eventName: string, detail?: any): boolean;
    subscribe(eventName: string, systemName: string, namespace?: string): boolean;
    private lookForAmbiguity;
    private resolveImplicitNamespace;
}
