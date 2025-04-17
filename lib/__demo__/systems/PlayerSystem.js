import { System } from '../../../dist/kernox.js';
export class AvatarSystem extends System {
    init() {
        // Dependancy injection during application setup
        this.attachToEvent("avatarInput", this.onAvatarInput);
        this.kinetics = this.getCollection("Kinetics");
    }
    onAvatarInput(details) {
        const { avatar, keys } = details;
        if (keys.has("w") && keys.get("w"))
            avatar.velocity.y = -1;
        if (keys.has("a") && keys.get("a"))
            avatar.velocity.x = -1;
        if (keys.has("s") && keys.get("s"))
            avatar.velocity.y = 1;
        if (keys.has("d") && keys.get("d"))
            avatar.velocity.x = 1;
    }
    switchAvatar() {
    }
    execute() { }
    ;
}
//# sourceMappingURL=PlayerSystem.js.map