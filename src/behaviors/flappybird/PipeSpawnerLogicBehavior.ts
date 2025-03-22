import { LogicBehavior, Inject } from "sprunk-engine";
import { PipeGameObject } from "../../gameobjects/PipeGameObject";
import { FlappGameManagerLogicBehavior } from "./FlappGameManagerLogicBehavior.ts";

/**
 * Logic behavior for spawning pipes when triggered
 */
export class PipeSpawnerLogicBehavior extends LogicBehavior<void> {
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

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
        this.gameObject.parent?.addChild(topPipe);
        topPipe.transform.position.set(10, gapCenter + gapSize/2 + topPipeHeight/2, 0);
        
        // Bottom pipe (floor)
        const bottomPipeHeight = 12 + (gapCenter - gapSize/2); // Calculate bottom pipe height
        const bottomPipe = new PipeGameObject(
            "BottomPipe", false, bottomPipeHeight
        );
        this.gameObject.parent?.addChild(bottomPipe);
        bottomPipe.transform.position.set(10, gapCenter - gapSize/2 - bottomPipeHeight/2, 0);
    }
} 