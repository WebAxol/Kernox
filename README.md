<div align="center">
<pre>
dP     dP                                              
88   .d8'                                              
88aaa8P'  .d8888b. 88d888b. 88d888b. .d8888b. dP.  .dP 
88   `8b. 88ooood8 88'  `88 88'  `88 88'  `88  `8bd8'  
88     88 88.  ... 88       88    88 88.  .88  .d88b.  
dP     dP `88888P' dP       dP    dP `88888P' dP'  `dP

----------------------------------------------------------------------
**Entity-Component-System-based JavaScript framework for real-time applications** 
</pre>
</div>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



                                                
<h2><b>Introduction</b></h2>
<p>
  <b style="color: violet">Kernox</b> is a simple javascript <b style="color: white">framework</b> designed to build highly decoupled <b style="color: white">real-time</b> applications. Inspired on the Entity-Component-System architecture, Kernox lets you define <b style="color: white">entities</b> based on <b style="color: white">prototypes</b> with multi-inheritance, allocated within collections and processed by specialized classes called <b style="color: white">Systems</b>, which communicate using events dispatched by an <b style="color: white">event broker</b>.
</p>
<h2>Usage</h2>

First, create a 'Kernox' instance: the top-level class that controls the framework components.

```ts
// Example path : app.ts

import { Kernox, KernoAddon }   from "Kernox";

// Recommended setup structure:

import { prototypes  }   from "./setup/prototypes.js";
import { listeners   }   from "./setup/listeners.js";
import { systems     }   from "./setup/systems.js";
import { collections }   from "./setup/collections.js";

// Resource bundler (Addon)

const demoApp : KernoAddon = {
    name : "demoApp",
    prototypes,
    systems,
    collections,
    listeners
};

// Instantiate Kernox, setup addons, and run

const app = new Kernox();

app.use(demoApp);
app.execute();
```
### Create Prototypes

```ts
// Example path : setup/prototypes.ts

import { PrototypeSchema, Entity } from 'Kernox';

type Vector2D = { x : number, y : number };

// Define prototype "Kinetic"

interface Kinetic extends Entity {
  position : Vector2D;
  velocity : Vector2D;
};

const kineticPrototype : PrototypeSchema<Kinetic> = {
  name : "Kinetic",
  attributes : {
    position : { x : 0, y : 0 },
    velocity : { x : 0, y : 0 }
  } as Kinetic,

  collections : new Set([ "Kinetics" ]) 
};

// Define prototype "Sprite"

interface Sprite extends Entity {
  position   : Vector2D;
  dimensions : Vector2D;
  url : string;
};

const spritePrototype : PrototypeSchema<Sprite> = {
  name : "Sprite",
  attributes : {
    position : { x : 0, y : 0 },
    dimensions : { x : 1, y : 1 },
    url : "../assets/default.png"
  },
  collections : new Set([ "Renderables" ])
};

// Define prototype "Player"

interface Player extends Kinetic, Sprite {
  hp : number;
  level : number;
  active : boolean;
};

const playerPrototype : PrototypeSchema<Player> = {
  name : "Player",
  attributes : {
    hp : 20,
    level : 1,
    active : false
  } as Player,
  
  collection : new Set([ "Players" ]),
  
  // Multiple inheritance:

  inherits : [ 
    kineticPrototype,
    spritePrototype 
  ]
};

export const prototypes = [ kineticPrototype, playerPrototype ];
```

### Define collections


```ts
// Example path : setup/collections.ts

import { LinearCollection } from 'Kernox';

class Kinetics     extends LinearCollection {};
class Renderables  extends LinearCollection {};
class Players      extends LinearCollection {};

export const collections = [ Kinetics, Renderables, Players ];
```

<p>Services contain code that is executed every frame by the World class. They are implemented as 'Service' sub-classes</p>

```ts
// Example path : setup/systems.ts

import { System, LinearCollection } from 'Kernox';

class MovementSystem extends System {
  
  private kinetics : LinearCollection = new LinearCollection(); // Dummy instance

  public init(){
    // Dependancy injection during application setup
    this.kinetics = this.__kernox.collectionManager.get("Kinetics");
  }

  public execute(){
    // Called each frame
    this.kinetics.iterate((entity : any) => {
      entity.position.x += entity.velocity.x;
      entity.position.y += entity.velocity.y;
    });
  }
}


class PlayerInputSystem extends System {

  private active : Player = {} as Player;

  private command_KeyMap = {
        w : () => { this.active.position.x -= 1 },
        s : () => { this.active.position.x += 1 },
        a : () => { this.active.position.x -= 1 },
        d : () => { this.active.position.x += 1 },
  };

  private keys = {
      w : false,
      s : false,
      d : false,
      a : false
  };

  public init(){
    // Define event listeners to handle player inputs
    window.addEventListener('keydown',  (e) => { this.keydown(e) });
    window.addEventListener('keyup',    (e) => { this.keyup(e)   });
  }

  public execute(){
    // Called each frame
    const keys = Object.keys(this.control);
    keys.forEach((key) => { 
      if(this.control[key] === true){ this.command_KeyMap[key](); }
    });   
  }

  private keydown(info){
    if(this.control[info.key] !== undefined) this.control[info.key] = true;
  }

  private keyup(info){
    if(this.control[info.key] !== undefined) this.control[info.key] = false;
  }
}

export const systems = [ MovementSystem, PlayerInputSystem ];
```

<hr>
<h3>Contribute</h3>

```sh
git clone https://github.com/WebAxol/Kernox.git
```

