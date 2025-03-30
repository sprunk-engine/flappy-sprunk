import {GameObject} from "sprunk-engine";
import {SpriteAnimationBehavior} from "../behaviors/logic/SpriteAnimationBehavior.ts";
import {IntervalEmitterLogicBehavior} from "../behaviors/logic/IntervalEmitterLogicBehavior.ts";
import {BirdAnimationController} from "../behaviors/flappybird/BirdAnimationController.ts";

export class BirdAnimationGameObject extends GameObject{
    protected onEnable() {
        super.onEnable();

        const animation = new SpriteAnimationBehavior([
            "/assets/sprites/yellowbird-midflap.png",
            "/assets/sprites/yellowbird-downflap.png",
            "/assets/sprites/yellowbird-midflap.png",
            "/assets/sprites/yellowbird-upflap.png",
        ]);
        this.addBehavior(animation);
        this.addBehavior(new IntervalEmitterLogicBehavior(0.1));

        this.addBehavior(new BirdAnimationController("/assets/sprites/yellowbird-dead.png"));
        this.transform.position.z = 0.001;
    }
}