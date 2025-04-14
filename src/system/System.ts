import { Kerno } from "../Kerno.js";

export class System {
    protected paused : boolean = false;
    
    constructor(
        protected __kerno : Kerno
    ){}

    public execute(){}

    public get isPaused(){
        return this.paused;
    }

    public set setPaused(state : boolean){
        this.paused = state;
    }
}