import { GameObject } from "sprunk-engine";
import { PipeSpawnerLogicBehavior } from "../behaviors/flappybird/PipeSpawnerLogicBehavior";
import {AcceleratingEmitterLogicBehavior} from "../behaviors/logic/AcceleratingEmitterLogicBehavior.ts";

/**
 * Game object responsible for spawning pipes
 */
export class PipeSpawnerGameObject extends GameObject {
    protected onEnable() {
        super.onEnable();

        const intervalEmitter = new AcceleratingEmitterLogicBehavior(2, 0.97, 0.4);
        this.addBehavior(intervalEmitter);

        const pipeSpawnerLogic = new PipeSpawnerLogicBehavior();
        this.addBehavior(pipeSpawnerLogic);

        intervalEmitter.onDataChanged.addObserver(() => {
            pipeSpawnerLogic.tryToSpawnPipe();
        });
    }
} 