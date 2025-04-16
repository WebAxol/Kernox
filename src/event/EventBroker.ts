import { Kernox }           from "../Kernox.js";

type EventHandler = (event: any) => void;

export class EventBroker{

    private listeners : Map<string,Set<Function>> = new Map();

    constructor( private __kernox : Kernox ){}

    /**
     * Dispatches a native custom event.
     * @param eventName The name of the event to dispatch.
     * @param detail Optional payload.
     */
    public dispatch(eventName: string, detail?: any): boolean {

        const listeners = this.listeners[eventName] || this.resolveImplicitNamespace(eventName);

        if(!listeners) return false;

        for(const handler of listeners) handler(detail);
    
        return true;
    }

    /**
     * Registers a handler function for a given event name.
     * @param eventName The event to listen to.
     * @param systemName Optional system identifier.
     */
    public subscribe(eventName: string, systemName: string, namespace :  string = ''): boolean {
        
        const system = this.__kernox.systemManager.get(systemName);

        if(!eventName || typeof eventName != "string"){
            throw new Error(`[EventManager] invalid event name provided: it must be a non-empty string`);
        }

        if (!system) {
            throw new Error(`[EventManager] system '${systemName}' not found.`);
        }

        
        const splittedEventName = eventName.split("."); 

        if(splittedEventName.length == 2){ 
            [ namespace, eventName ] = splittedEventName;
        }
        const baseMethodName = `on${eventName}`;
        const fullMethodName = (namespace ? namespace + "_" : "") + baseMethodName;
        const fullEventName  = namespace ? `${namespace}.${eventName}` : eventName;

        console.log(fullMethodName, system[fullMethodName]);

        var methodName :string;

        if(baseMethodName !== fullMethodName && typeof system[fullMethodName] === 'function' && typeof system[baseMethodName] === 'function') {
            throw new Error(`[EventManager] '${systemName}' has duplicated handler methods for event ${eventName}'`);
        }

        if (typeof system[fullMethodName] !== 'function' && typeof system[baseMethodName] !== 'function') {
            throw new Error(`[EventManager] '${systemName}' does not implement a handler method for event ${eventName}`);
        }
        else if(typeof system[fullMethodName] === 'function'){
            methodName = fullMethodName;
        }
        else{
            const ambiguity = this.lookForAmbiguity(eventName);
            if(ambiguity){ 
                throw new Error(`[EventManager] '${systemName}' implements '${baseMethodName}', which is ambiguous, please implement '${fullMethodName}' instead.`);
            }
            methodName = baseMethodName;
        }

        const handlerFn: EventHandler = (detail) => {
            system[methodName]?.(detail);
        };

    
        if(!this.listeners[fullEventName]) this.listeners[fullEventName] = new Set();

        this.listeners[fullEventName].add(handlerFn);

        return true;
    }

    private lookForAmbiguity(eventName : string) : boolean {
        const namespaces = this.__kernox.addonLoader.namespaces;
        let resource;

        for(const namespace of namespaces){
            resource = this.listeners[`${namespace}.${eventName}`];
            if(resource) return true;
        }

        return false;
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
