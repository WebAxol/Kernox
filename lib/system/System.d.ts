import { Kerno } from "../Kerno.js";
export declare class System {
    protected __kerno: Kerno;
    protected paused: boolean;
    constructor(__kerno: Kerno);
    execute(): void;
    get isPaused(): boolean;
    set setPaused(state: boolean);
}
