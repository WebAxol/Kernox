import { System } from "../../system/System.js";
import { LinearCollection } from "../../collection/LinearCollection.js";
const criteria = (item) => { return !item.belongsTo("Frozen"); };
export class PlayerMovement extends System {
    constructor() {
        super(...arguments);
        this.players = new LinearCollection();
        this.frozen = new LinearCollection();
        this.canMove = [];
    }
    init() {
        this.players = this.__kernox.collectionManager.get("Players");
        this.frozen = this.__kernox.collectionManager.get("Frozen");
    }
    execute() {
        if (this.frozen.changed)
            this.canMove = this.players.filter(criteria);
    }
    namespace_onkeydown() {
    }
}
//# sourceMappingURL=PlayerMovement.js.map