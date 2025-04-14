export class System {
    constructor(__kerno) {
        this.__kerno = __kerno;
        this.paused = false;
    }
    execute() { }
    get isPaused() {
        return this.paused;
    }
    set setPaused(state) {
        this.paused = state;
    }
}
//# sourceMappingURL=System.js.map