import { GameObject, SpriteRenderBehavior } from "sprunk-engine";
import { PipeLogicBehavior } from "../behaviors/flappybird/PipeLogicBehavior";
import {ScrollingSpeedManagerDriven} from "../behaviors/flappybird/ScrollingSpeedManagerDriven.ts";

/**
 * Represents a single pipe obstacle in Flappy Bird
 */
export class PipeGameObject extends GameObject {
    private _isTopPipe: boolean;
    private _height: number;

    /**
     * Create a new pipe
     * @param name The name of the pipe
     * @param isTopPipe Whether this is a top pipe (ceiling) or bottom pipe (floor)
     * @param height The height of the pipe
     */
    constructor(name: string, isTopPipe: boolean, height: number) {
        super(name);
        this._isTopPipe = isTopPipe;
        this._height = height;
    }

    protected onEnable() {
        super.onEnable();

        // Add pipe sprite
        this.addBehavior(
            new SpriteRenderBehavior("/assets/sprites/pipe-green.png")
        );

        // Position and scale the pipe
        this.transform.scale.set(1, this._height, 1);
        
        // Flip top pipe by rotating 180 degrees
        if (this._isTopPipe) {
            this.transform.rotation.setFromEulerAngles(0, 0, Math.PI);
        }

        // Add pipe logic
        const scrollingLogic = new PipeLogicBehavior(0);
        this.addBehavior(scrollingLogic);
        this.addBehavior(new ScrollingSpeedManagerDriven(scrollingLogic));
    }
} 