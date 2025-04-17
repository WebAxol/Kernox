import { Kernox, KernoAddon } from "../../dist/kernox.js";

// Recommended setup structure:

import { prototypes  }   from "./setup/prototypes.js";
import { systems     }   from "./setup/systems.js";
import { collections }   from "./setup/collections.js";

// Resource bundler (Addon)

const demoApp : KernoAddon = {
    name : "demoApp",
    prototypes,
    systems,
    collections
};

// Instantiate Kernox, setup addons, and run

const app = new Kernox();

app.use(demoApp);
app.execute();
