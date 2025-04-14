import { System } from "./System.js";

export class SystemManager {

    private systems : Map<string,System> = new Map();
    private executionList :System[] = [];

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
    public use(system : System) : boolean {
        const systemName :string = system.constructor.name;

        if(!(system instanceof System)){
            throw new Error("Expected instance of 'System'");
        }

        if(this.systems.has(systemName)){
            console.warn(`System '${systemName}' is already registered`);
            return false;
        }

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

    public getSystem(systemName : string) : System | undefined {
        return this.systems.get(systemName);
    }
}