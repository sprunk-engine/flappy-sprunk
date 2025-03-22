import { GameObject, SpriteRenderBehavior } from "sprunk-engine";
import {RepeatableScrollingLogicBehavior} from "../behaviors/transform/RepeatableScrollingLogicBehavior.ts";
import {ScrollingSpeedManagerDriven} from "../behaviors/flappybird/ScrollingSpeedManagerDriven.ts";

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
        
        // Add ground scrolling logic - using game manager for speed control
        // The x and z values remain 0, y is set to negative game speed, keeping 0.5 for repeat offset
        const scrollingLogic = new RepeatableScrollingLogicBehavior(0, 0, 0.5);
        this.addBehavior(scrollingLogic);
        this.addBehavior(new ScrollingSpeedManagerDriven(scrollingLogic));
    }
}