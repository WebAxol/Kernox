import { Kerno } from "../Kerno.js";

export class System {
    private paused : boolean = false;
    
    constructor(
        private kerno : Kerno
    ){}

    public execute(){}

    public get isPaused(){
        return this.paused;
    }

    public set setPaused(state : boolean){
        this.paused = state;
    }
}