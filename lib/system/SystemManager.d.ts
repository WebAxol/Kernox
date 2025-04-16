import { Kernox } from "../Kernox.js";
import { System } from "./System.js";
export declare class SystemManager {
    private __kernox;
    private systems;
    private executionList;
    constructor(__kernox: Kernox);
    execute(): void;
    use(Ctor: new (kernox: Kernox) => System, namespace?: string): boolean;
    unuse(systemName: string): void;
    get<T extends System>(systemName: string): T | undefined;
}
