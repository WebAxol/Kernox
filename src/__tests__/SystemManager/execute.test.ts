import { SystemManager } from "../../system/SystemManager.js";
import { System } from "../../system/System.js";
import { Kerno } from "../../Kerno.js";

const systemManager = new SystemManager();

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

const kerno = new Kerno();
const inputSystem = new InputSystem(kerno);
const physicsSystem = new PhysicsSystem(kerno);
const renderingSystem = new RenderingSystem(kerno);

systemManager.use(inputSystem);
systemManager.use(physicsSystem);
systemManager.use(renderingSystem);

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
        
        physicsSystem.setPaused = true;
        
        gameState = "";
        expectedState = "";

        for(let i = 0; i < 10; i++){
            systemManager.execute();
            expectedState += "IR";
            expect(gameState).toEqual(expectedState);
        }
    })
});