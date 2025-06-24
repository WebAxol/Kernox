import { Kernox } from "../Kernox.js";
import { KernoAddon } from "../addon/KernoxAddon.js";

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

for(let i = 0; i < 50; i++){

    // When working with addons, it is recommended to specify namespaces before resource names
    // ambiguity issues may occur otherwise, if two resources from different origins have the same name.

    app.entityFactory.create("demoApp.Circle", {
        position : { 
            x : 0 + Math.random() * 1000, 
            y : 0 + Math.random() * 500 
        },
        velocity : {
            x : -2.5 + Math.random() * 5, 
            y : -2.5 + Math.random() * 5 
        },
        radius : 10 + Math.random() * 20
    });    

}

console.log(app);

app.execute();
