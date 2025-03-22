import { GameObject } from "sprunk-engine";
import { PipeSpawnerLogicBehavior } from "../behaviors/flappybird/PipeSpawnerLogicBehavior";
import {IntervalEmitterLogicBehavior} from "../behaviors/logic/IntervalEmitterLogicBehavior.ts";

/**
 * Game object responsible for spawning pipes
 */
export class PipeSpawnerGameObject extends GameObject {
    protected onEnable() {
        super.onEnable();

        const intervalEmitter = new IntervalEmitterLogicBehavior(2000);
        this.addBehavior(intervalEmitter);

        const pipeSpawnerLogic = new PipeSpawnerLogicBehavior();
        this.addBehavior(pipeSpawnerLogic);

        intervalEmitter.onDataChanged.addObserver(() => {
            pipeSpawnerLogic.tryToSpawnPipe();
        });
    }
} 