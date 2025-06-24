import { System } from "../../system/System";
export declare class CollisionSystem extends System {
    private kinetics;
    init(): void;
    execute(): void;
    private bounceAtEdge;
    private bounceWithOthers;
}
