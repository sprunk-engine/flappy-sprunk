import { LogicBehavior, Inject } from "sprunk-engine";
import { FlappGameManagerLogicBehavior } from "./FlappGameManagerLogicBehavior";

/**
 * Pipe logic behavior for moving pipes and collision detection
 */
export class PipeLogicBehavior extends LogicBehavior<void> {
    private _speed: number = 0.5;
    private _passed: boolean = false;
    
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    public tick(deltaTime: number): void {
        // Move pipe from right to left
        this.gameObject.transform.position.x -= this._speed * deltaTime;

        // Check if pipe is offscreen and should be removed
        if (this.gameObject.transform.position.x < -10) {
            this.gameObject.parent?.removeChild(this.gameObject);
            return;
        }

        // Check if bird has passed the pipe
        if (!this._passed && this.gameObject.transform.position.x < -3) {
            this._passed = true;
            this._gameManager.increaseScore();
        }

        // Check collision with bird
        this.checkBirdCollision();
    }

    /**
     * Check for collision with the bird
     */
    private checkBirdCollision(): void {
        if (!this._gameManager.isGamePlaying()) return;

        const pipePos = this.gameObject.transform.position;
        const birdPos = this._gameManager.birdTransform.position;

        // Simple box collision check
        const pipeWidth = 1.0;
        const pipeHeight = 8.0; // Full height of pipe
        const birdRadius = 0.5;

        // Check if bird is within pipe's X range
        if (Math.abs(birdPos.x - pipePos.x) < (pipeWidth / 2 + birdRadius)) {
            // Check if bird is colliding with the pipe's Y range
            if (this.gameObject.name === "TopPipe") {
                // For top pipe, check if bird is above pipe bottom
                if (birdPos.y > pipePos.y - pipeHeight / 2) {
                    // Kill the bird
                    this._gameManager.gameOver();
                }
            } else {
                // For bottom pipe, check if bird is below pipe top
                if (birdPos.y < pipePos.y + pipeHeight / 2) {
                    // Kill the bird
                    this._gameManager.gameOver();
                }
            }
        }
    }
} 