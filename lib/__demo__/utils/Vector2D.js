export class Vector2D {
    constructor(__x, __y) {
        this.__x = __x;
        this.__y = __y;
    }
    get x() {
        return this.__x;
    }
    get y() {
        return this.__y;
    }
    set x(x) {
        this.__x = x;
    }
    set y(y) {
        this.__y = y;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
}
//# sourceMappingURL=Vector2D.js.map