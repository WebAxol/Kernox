import { System } from "../../system/System";
export declare class PlayerMovement extends System {
    private players;
    private frozen;
    private canMove;
    init(): void;
    execute(): void;
    namespace_onkeydown(): void;
}
