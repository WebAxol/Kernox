import { Kernox } from "../Kernox.js";
import { isSubclassOf } from "../utils/isSubclassOf.js";
import { System } from "./System.js";

export class SystemManager {

    private systems : Map<string,System> = new Map();
    private executionList :System[] = [];

    constructor( private __kernox : Kernox ){}

    /**
     * @description Executes all systems sequentially. 
     * Systems are executed in the order they were registered.
     */
    public execute() : void {
        this.executionList.forEach((system) => { if(!system.isPaused) system.execute() });
    }

    /**
     * @description Vinculates a system, so that it's execution method is called on every frame.
     * @param system An instance of 'System'
     * @returns 
     */
    public use(Ctor : new (kernox : Kernox) => System, namespace :  string = '') : boolean {
        
        const systemName = namespace ? `${namespace}.${Ctor.name}` : Ctor.name;

        if(!isSubclassOf(Ctor, System)){
            throw new Error("Expected instance of 'System'");
        }

        if(this.systems.has(systemName)){
            console.warn(`System '${systemName}' is already registered`);
            return false;
        }

        const system = new Ctor(this.__kernox);
        this.systems.set(systemName, system);
        this.executionList.push(system);

        return true;
    }

    /**
     * Removes system from the execution list and registry.
     * @param systemName A string corresponding to the class of the system to remove.
     */

    public unuse(systemName: string): void {
        const system = this.systems.get(systemName);
        if (!system) return;
    
        this.systems.delete(systemName);
        this.executionList = this.executionList.filter(s => s !== system);
    }

    public get<T extends System>(systemName : string) : T | undefined {
        return this.systems.get(systemName) as T;
    }
}