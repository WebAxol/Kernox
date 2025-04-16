import { Kerno } from "../Kerno.js";
import { System } from "./System.js";
export declare class SystemManager {
    private __kerno;
    private systems;
    private executionList;
    constructor(__kerno: Kerno);
    execute(): void;
    use(Ctor: new (kerno: Kerno) => System, namespace?: string): boolean;
    unuse(systemName: string): void;
    get<T extends System>(systemName: string): T | undefined;
}
