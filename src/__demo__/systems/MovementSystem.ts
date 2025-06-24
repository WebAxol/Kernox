import { System } from "../../system/System.js";
import { Kinetics } from "../setup/collections.js";

export class MovementSystem extends System {
  
  private kinetics! : Kinetics;

  public init() : void {
    // Dependancy injection during application setup
    this.kinetics = this.getCollection<Kinetics>("Kinetics");
  }

  // Called each frame
  public execute() : void {

    // Collections are iterable
    for(const entity of this.kinetics){

      // Entities contain data, and are updated by systems
      entity.position.x += entity.velocity.x * ((1000 / 60) / this.__kernox.dt);
      entity.position.y += entity.velocity.y * ((1000 / 60) / this.__kernox.dt);

    };
  }
};