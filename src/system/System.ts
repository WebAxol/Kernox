import { Kernox } from "../Kernox.js";

export class System {
    protected paused : boolean = false;
    
    constructor(
        protected __kernox : Kernox
    ){}

    public execute(){}

    public get isPaused(){
        return this.paused;
    }

    public set setPaused(state : boolean){
        this.paused = state;
    }
}