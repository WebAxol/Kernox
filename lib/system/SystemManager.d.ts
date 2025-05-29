import type { Kernox } from "../Kernox.js";
import { System } from "./System.js";
export declare class SystemManager {
    private __kernox;
    private systems;
    private executionList;
    constructor(__kernox: Kernox);
    /**
     * @description Executes all systems sequentially.
     * Systems are executed in the order they were registered.
     */
    execute(): void;
    /**
     * @description Vinculates a system, so that it's execution method is called on every frame.
     * @param system An instance of 'System'.
     * @returns True if new system is registered, false otherwise.
     */
    use(Ctor: new (kernox: Kernox, context: string) => System, namespace?: string): boolean;
    /**
     * Removes system from the execution list and registry.
     * @param systemName A string corresponding to the class of the system to remove.
     */
    unuse(systemName: string): void;
    get<T extends System>(systemName: string): T | undefined;
}
