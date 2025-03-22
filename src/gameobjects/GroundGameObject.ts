import { GameObject, SpriteRenderBehavior } from "sprunk-engine";
import {RepeatableScrollingLogicBehavior} from "../behaviors/transform/RepeatableScrollingLogicBehavior.ts";
import {ScrollingSpeedManagerDriven} from "../behaviors/flappybird/ScrollingSpeedManagerDriven.ts";

/**
 * The ground for Flappy Bird
 */
export class GroundGameObject extends GameObject {
    private _id : number;
    private _maxId : number;

    constructor(id : number, maxId : number) {
        super("Ground");
        this._id = id;
        this._maxId = maxId;
    }

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
        const scrollingLogic = new RepeatableScrollingLogicBehavior(this._maxId*5, -this._maxId*5, 0);
        this.addBehavior(scrollingLogic);
        this.addBehavior(new ScrollingSpeedManagerDriven(scrollingLogic));
    }
}