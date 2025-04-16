import { isSubclassOf } from "../utils/isSubclassOf.js";
import { System } from "./System.js";
export class SystemManager {
    constructor(__kerno) {
        this.__kerno = __kerno;
        this.systems = new Map();
        this.executionList = [];
    }
    execute() {
        this.executionList.forEach((system) => { if (!system.isPaused)
            system.execute(); });
    }
    use(Ctor, namespace = '') {
        const systemName = namespace ? `${namespace}.${Ctor.name}` : Ctor.name;
        if (!isSubclassOf(Ctor, System)) {
            throw new Error("Expected instance of 'System'");
        }
        if (this.systems.has(systemName)) {
            console.warn(`System '${systemName}' is already registered`);
            return false;
        }
        const system = new Ctor(this.__kerno);
        this.systems.set(systemName, system);
        this.executionList.push(system);
        return true;
    }
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