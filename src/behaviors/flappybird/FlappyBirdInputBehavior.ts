import {DeviceInputBehavior, Inject} from "sprunk-engine";
import {BirdLogicBehavior} from "./BirdLogicBehavior.ts";

/**
 * Input behavior for controlling the flappy bird.
 * Listens for space bar presses and makes the bird flap.
 */
export class FlappyBirdInputBehavior extends DeviceInputBehavior {
    @Inject(BirdLogicBehavior)
    private _logic!: BirdLogicBehavior;
    
    public override onKeyboardKeyDown(key: string): void {
        if (key === " " && this._logic) { // Space bar key
            this._logic.flap();
        }
    }
} 