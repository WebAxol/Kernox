import { System, LinearCollection } from '../../../dist/kernox.js';
import type { Avatar } from '../proto/Avatar.js';

export class AvatarSystem extends System {
  
  private kinetics! : LinearCollection;

  public init() : void {
    // Dependancy injection during application setup
    this.attachToEvent("avatarInput", this.onAvatarInput);
    this.kinetics = this.getCollection<LinearCollection>("Kinetics");
  }

  public onAvatarInput(details : { avatar : Avatar, keys : Map<string,boolean> }) : void {
    const { avatar, keys } = details;

    if(keys.has("w") && keys.get("w")) avatar.velocity.y = -1;
    if(keys.has("a") && keys.get("a")) avatar.velocity.x = -1;
    if(keys.has("s") && keys.get("s")) avatar.velocity.y =  1;
    if(keys.has("d") && keys.get("d")) avatar.velocity.x =  1;
  }

  public switchAvatar(){

  }

  public execute() : void {};
}