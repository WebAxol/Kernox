import { SystemManager } from "../../system/SystemManager.js";
import { System } from "../../system/System.js";
import { Kerno } from "../../Kerno.js";
const systemManager = new SystemManager(new Kerno());
var gameState, expectedState;
class InputSystem extends System {
    execute() {
        gameState += "I";
    }
}
;
class PhysicsSystem extends System {
    execute() {
        gameState += "P";
    }
}
;
class RenderingSystem extends System {
    execute() {
        gameState += "R";
    }
}
;
const kerno = new Kerno();
systemManager.use(InputSystem);
systemManager.use(PhysicsSystem);
systemManager.use(RenderingSystem);
const physicsSystem = systemManager.get("PhysicsSystem");
describe("SystemManager.execute()", () => {
    test("That systems are executed in the right order every frame", () => {
        gameState = "";
        expectedState = "";
        for (let i = 0; i < 10; i++) {
            systemManager.execute();
            expectedState += "IPR";
            expect(gameState).toEqual(expectedState);
        }
    });
    test("That paused systems are ignored", () => {
        if (physicsSystem)
            physicsSystem.setPaused = true;
        gameState = "";
        expectedState = "";
        for (let i = 0; i < 10; i++) {
            systemManager.execute();
            expectedState += "IR";
            expect(gameState).toEqual(expectedState);
        }
    });
});
//# sourceMappingURL=execute.test.js.map