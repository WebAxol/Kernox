export class Vector2D {
    constructor(
        private __x : number,
        private __y : number,
    ){}

    public get x(){
        return this.__x;
    }

    public get y(){
        return this.__y;
    }

    public set x(x : number){
        this.__x = x;
    }

    public set y(y : number){
        this.__y= y;
    }
}