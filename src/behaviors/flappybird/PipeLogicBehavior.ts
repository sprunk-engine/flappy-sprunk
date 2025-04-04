import { Inject } from "sprunk-engine";
import { FlappGameManagerLogicBehavior } from "./FlappGameManagerLogicBehavior";
import {ScrollingLogicBehavior} from "../transform/ScrollingLogicBehavior.ts";

/**
 * Pipe logic behavior for moving pipes and collision detection
 */
export class PipeLogicBehavior extends ScrollingLogicBehavior {
    private _passed: boolean = false;
    private _isTopPipe: boolean;
    
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    constructor(scrollSpeed: number, isTopPipe: boolean = false) {
        super(scrollSpeed);
        this._isTopPipe = isTopPipe;
    }

    public tick(deltaTime: number): void {
        super.tick(deltaTime);

        // Check if pipe is offscreen and should be removed
        if (this.gameObject.transform.position.x < -20) {
            this.gameObject.parent?.removeChild(this.gameObject);
            return;
        }

        // Check if bird has passed the pipe
        // Only increase score for one pipe (not top pipe) to prevent double counting
        if (!this._passed && this.gameObject.transform.position.x < -3 && !this._isTopPipe) {
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
        const birdPos = this._gameManager.birdTransform!.position;

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