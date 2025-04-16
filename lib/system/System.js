export class System {
    constructor(__kernox) {
        this.__kernox = __kernox;
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