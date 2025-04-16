import { Kerno } from "../Kerno.js";
import { KernoAddon } from "./KernoAddon.js";
import { PrototypeSchema } from "../entity/PrototypeSchema.js";
import { AbstractCollection } from "../collection/AbstractCollection.js";
import { System } from "../system/System.js";

export class AddonLoader {

    private __namespaces : Set<string> = new Set();

    constructor( private __kerno : Kerno ){}

    public use(addon : KernoAddon){
        
        const { name } = addon;

        if(this.namespaces.has(name)){
            throw new Error(`Conflict with already existing namespace '${name}', please consider renaming one of them.`);
        }

        if(addon.collections) this.registerCollections(addon.collections,name);
        if(addon.prototypes)  this.registerPrototypes(addon.prototypes,name);
        if(addon.systems)     this.registerSystems(addon.systems,name);
        if(addon.listeners)   this.registerEventListeners(addon.listeners,name);

        this.namespaces.add(name);
    }

    public get namespaces(){
        return this.__namespaces;
    }

    private registerPrototypes(prototypes : PrototypeSchema<any>[], namespace : string){
        prototypes.forEach(proto => {
            this.__kerno.entityFactory.prototype(proto,namespace);
        });
    }
    
    private registerCollections(collections : (new () => AbstractCollection)[], namespace : string){
        collections.forEach(collection => {
            this.__kerno.collectionManager.use(collection, namespace);
        });
    }

    private registerSystems(services : (new () => System)[], namespace : string){
        services.forEach(service => {
            this.__kerno.systemManager.use(service, namespace);
        });
    }
    
    private registerEventListeners(listeners, namespace : string){
        const events = Object.keys(listeners);

        events.forEach((event) => {
            const services = listeners[event];
            services.forEach(service => this.__kerno.eventBroker.subscribe(event,service, namespace) );
        });
    }
}