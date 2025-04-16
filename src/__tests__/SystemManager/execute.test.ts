import { SystemManager } from "../../system/SystemManager.js";
import { System } from "../../system/System.js";
import { Kernox } from "../../Kernox.js";

const systemManager = new SystemManager(new Kernox());

var gameState :string, expectedState :string;

class InputSystem extends System {

    public execute(): void {
        gameState += "I";
    }
};

class PhysicsSystem extends System {

    public execute(): void {
        gameState += "P";
    }
};

class RenderingSystem extends System {

    public execute(): void {
        gameState += "R";
    }
};

systemManager.use(InputSystem);
systemManager.use(PhysicsSystem);
systemManager.use(RenderingSystem);

const physicsSystem = systemManager.get("PhysicsSystem");

describe("SystemManager.execute()", () => {

    test("That systems are executed in the right order every frame", () => {
        
        gameState = "";
        expectedState = "";

        for(let i = 0; i < 10; i++){
            systemManager.execute();
            expectedState += "IPR";
            expect(gameState).toEqual(expectedState);
        }
    });

    test("That paused systems are ignored", () => {
        
        if(physicsSystem) physicsSystem.setPaused = true;
        
        gameState = "";
        expectedState = "";

        for(let i = 0; i < 10; i++){
            systemManager.execute();
            expectedState += "IR";
            expect(gameState).toEqual(expectedState);
        }
    })
});