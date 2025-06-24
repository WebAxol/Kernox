import { isSubclassOf } from "../utils/isSubclassOf.js";
import { System } from "./System.js";
export class SystemManager {
    constructor(__kernox) {
        this.__kernox = __kernox;
        this.systems = new Map();
        this.executionList = [];
    }
    /**
     * @description Executes all systems sequentially.
     * Systems are executed in the order they were registered.
     */
    execute() {
        this.executionList.forEach((system) => { if (!system.paused)
            system.execute(); });
    }
    /**
     * @description Vinculates a system, so that it's execution method is called on every frame.
     * @param system An instance of 'System'.
     * @returns True if new system is registered, false otherwise.
     */
    use(Ctor, namespace = '') {
        const systemName = namespace ? `${namespace}.${Ctor.name}` : Ctor.name;
        if (!isSubclassOf(Ctor, System)) {
            throw new Error("Expected instance of 'System'");
        }
        if (this.systems.has(systemName)) {
            console.warn(`System '${systemName}' is already registered`);
            return false;
        }
        const system = new Ctor(this.__kernox, namespace);
        system.init();
        this.systems.set(systemName, system);
        this.executionList.push(system);
        return true;
    }
    /**
     * Removes system from the execution list and registry.
     * @param systemName A string corresponding to the class of the system to remove.
     */
    unuse(systemName) {
        const system = this.systems.get(systemName);
        if (!system)
            return;
        this.systems.delete(systemName);
        this.executionList = this.executionList.filter(s => s !== system);
    }
    get(systemName) {
        return this.systems.get(systemName);
    }
}
//# sourceMappingURL=SystemManager.js.map