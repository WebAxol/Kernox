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

    public add(v :Vector2D){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public sub(v :Vector2D){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
}