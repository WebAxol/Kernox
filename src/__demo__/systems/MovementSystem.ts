import { System, LinearCollection } from '../../../dist/kernox.js';

export class MovementSystem extends System {
  
  private kinetics! : LinearCollection;

  public init() : void {
    // Dependancy injection during application setup
    this.kinetics = this.getCollection<LinearCollection>("Kinetics");
  }

  public execute() : void {
    // Called each frame
    this.kinetics.iterate((entity : any) => {
      entity.position.x += entity.velocity.x;
      entity.position.y += entity.velocity.y;
    });
  }
}