import { System } from '../../../dist/kernox.js';
import type { Avatar } from '../proto/Avatar.js';
export declare class AvatarSystem extends System {
    private kinetics;
    init(): void;
    onAvatarInput(details: {
        avatar: Avatar;
        keys: Map<string, boolean>;
    }): void;
    switchAvatar(): void;
    execute(): void;
}
