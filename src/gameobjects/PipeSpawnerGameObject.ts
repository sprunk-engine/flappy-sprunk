import { GameObject, Inject } from "sprunk-engine";
import { PipeSpawnerLogicBehavior } from "../behaviors/flappybird/PipeSpawnerLogicBehavior";
import { AcceleratingEmitterLogicBehavior } from "../behaviors/logic/AcceleratingEmitterLogicBehavior.ts";
import { FlappGameManagerLogicBehavior } from "../behaviors/flappybird/FlappGameManagerLogicBehavior.ts";
import { GameState } from "../models/GameState.ts";

/**
 * Game object responsible for spawning pipes
 */
export class PipeSpawnerGameObject extends GameObject {
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    private _intervalEmitter: AcceleratingEmitterLogicBehavior | null = null;

    protected onEnable() {
        super.onEnable();

        this._intervalEmitter = new AcceleratingEmitterLogicBehavior(2, 0.97, 0.4);
        this.addBehavior(this._intervalEmitter);

        const pipeSpawnerLogic = new PipeSpawnerLogicBehavior();
        this.addBehavior(pipeSpawnerLogic);

        this._intervalEmitter.onDataChanged.addObserver(() => {
            pipeSpawnerLogic.tryToSpawnPipe();
        });

        // Connect to game manager to reset acceleration when game starts
        this._gameManager.onGameStateChange.addObserver(this.onGameStateChange.bind(this));
    }

    /**
     * Handle game state changes
     */
    private onGameStateChange(state: GameState): void {
        if (state === GameState.PLAYING && this._intervalEmitter) {
            // Reset emitter acceleration when game starts
            this._intervalEmitter.resetAcceleration();
        }
    }
} 