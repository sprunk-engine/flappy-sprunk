import { GameObject, SpriteRenderBehavior } from "sprunk-engine";
import { ScrollingLogicBehavior } from "../behaviors/transform/ScrollingLogicBehavior";

/**
 * The ground for Flappy Bird
 */
export class GroundGameObject extends GameObject {
    protected onEnable() {
        super.onEnable();
        
        // Add ground sprite renderer
        this.addBehavior(
            new SpriteRenderBehavior("/assets/sprites/base.png")
        );
        
        // Scale the ground to cover the width of the screen
        this.transform.scale.set(10, 1, 1);
        
        // Add ground scrolling logic
        this.addBehavior(new ScrollingLogicBehavior(0, -5, 0.5));
    }
} 