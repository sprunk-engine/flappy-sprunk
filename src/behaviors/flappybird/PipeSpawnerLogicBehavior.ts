import { LogicBehavior, Inject } from "sprunk-engine";
import { PipeGameObject } from "../../gameobjects/PipeGameObject";
import { FlappGameManagerLogicBehavior } from "./FlappGameManagerLogicBehavior.ts";
import { GameState } from "../../models/GameState.ts";

/**
 * Logic behavior for spawning pipes when triggered
 */
export class PipeSpawnerLogicBehavior extends LogicBehavior<void> {
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    protected onEnable(): void {
        super.onEnable();
        
        // Subscribe to game state changes
        this._gameManager.onGameStateChange.addObserver(this.onGameStateChange.bind(this));
    }

    /**
     * Handle game state changes
     */
    private onGameStateChange(state: GameState): void {
        if (state === GameState.PLAYING) {
            // Destroy all existing pipes when a new game starts
            this.destroyAllPipes();
        }
    }

    /**
     * Try to spawn a pipe pair
     */
    public tryToSpawnPipe(): void {
        if (this._gameManager.isGamePlaying()) {
            this.spawnPipePair();
        }
    }
    
    /**
     * Spawn a pair of pipes (top and bottom) with a gap between them
     */
    private spawnPipePair(): void {
        // Random gap position (between -2 and 2)
        const gapCenter = Math.random() * 4 - 2;
        // Gap size
        const gapSize = 3;
        
        // Top pipe (ceiling)
        const topPipeHeight = 12 - (gapCenter + gapSize/2); // Calculate top pipe height
        const topPipe = new PipeGameObject(
            "TopPipe", true, topPipeHeight
        );
        this.gameObject.addChild(topPipe);
        topPipe.transform.position.set(20, gapCenter + gapSize/2 + topPipeHeight/2, 0);
        
        // Bottom pipe (floor)
        const bottomPipeHeight = 12 + (gapCenter - gapSize/2); // Calculate bottom pipe height
        const bottomPipe = new PipeGameObject(
            "BottomPipe", false, bottomPipeHeight
        );
        this.gameObject.addChild(bottomPipe);
        bottomPipe.transform.position.set(20, gapCenter - gapSize/2 - bottomPipeHeight/2, 0);
    }

    /**
     * Destroy all existing pipe objects
     */
    private destroyAllPipes(): void {
        // Get all children of the game object
        const children = [...this.gameObject.children];
        
        // Destroy each child that is a pipe
        for (const child of children) {
            if (child instanceof PipeGameObject) {
                child.destroy();
            }
        }
    }
} 