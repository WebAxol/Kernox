import { Kernox } from "../Kernox.js";
export declare class System {
    protected __kernox: Kernox;
    protected paused: boolean;
    constructor(__kernox: Kernox);
    execute(): void;
    get isPaused(): boolean;
    set setPaused(state: boolean);
}
