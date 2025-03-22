import { GameObject, SpriteRenderBehavior } from "sprunk-engine";
import { BirdLogicBehavior } from "../behaviors/flappybird/BirdLogicBehavior";
import { FlappyBirdInputBehavior } from "../behaviors/flappybird/FlappyBirdInputBehavior";

/**
 * The main bird game object for Flappy Bird
 */
export class BirdGameObject extends GameObject {
    private _logicBehavior: BirdLogicBehavior | null = null;
    
    protected onEnable() {
        super.onEnable();
        
        // Add sprite renderer
        this.addBehavior(
            new SpriteRenderBehavior("/assets/sprites/yellowbird-midflap.png")
        );
        
        // Add bird logic
        this._logicBehavior = new BirdLogicBehavior();
        this.addBehavior(this._logicBehavior);
        
        // Add input behavior
        this.addBehavior(new FlappyBirdInputBehavior());
        
        // Set initial scale to make bird the right size
        this.transform.scale.set(1, 1, 1);
    }
    
    /**
     * Get the bird logic behavior
     */
    public getBirdLogic(): BirdLogicBehavior | null {
        return this._logicBehavior;
    }
} 