import { Kernox } from "../Kernox.js";
import { prototypes } from "./setup/prototypes.js";
import { listeners } from "./setup/listeners.js";
import { systems } from "./setup/systems.js";
import { collections } from "./setup/collections.js";
const demoApp = {
    name: "demoApp",
    prototypes,
    systems,
    collections,
    listeners
};
const app = new Kernox();
app.use(demoApp);
app.execute();
//# sourceMappingURL=app.js.map