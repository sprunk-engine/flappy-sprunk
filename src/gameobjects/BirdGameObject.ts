import {GameObject, SpriteRenderBehavior, PolygonCollider, Vector2, Vector3} from "sprunk-engine";
import { BirdLogicBehavior } from "../behaviors/flappybird/BirdLogicBehavior";
import { FlappyBirdInputBehavior } from "../behaviors/flappybird/FlappyBirdInputBehavior";
import {RotateByVelocityOutputBehavior} from "../behaviors/output/RotateByVelocityOutputBehavior.ts";

/**
 * The main bird game object for Flappy Bird
 */
export class BirdGameObject extends GameObject {
    private _logicBehavior: BirdLogicBehavior | null = null;
    private _collider: PolygonCollider | null = null;

    protected onEnable() {
        super.onEnable();

        // Create bird collider (square shape for simplicity)
        const birdVertices = [
            new Vector2(0.3, 0.3),
            new Vector2(0.3, -0.3),
            new Vector2(-0.3, -0.3),
            new Vector2(-0.3, 0.3),
        ];

        this._collider = new PolygonCollider(birdVertices);
        this.addBehavior(this._collider);

        // Add sprite renderer (visual representation)
        this.addBehavior(
            new SpriteRenderBehavior("/assets/sprites/yellowbird-midflap.png")
        );

        // Add bird logic
        this._logicBehavior = new BirdLogicBehavior();
        this.addBehavior(this._logicBehavior);

        // Add input behavior
        this.addBehavior(new FlappyBirdInputBehavior());

        // Set initial position and scale
        this.transform.position.set(-3, 0, 0);
        this.transform.scale.set(1, 1, 1);

        const rotateByVelocityOutputBehavior = new RotateByVelocityOutputBehavior(Vector3.forward(), 0.1, Math.PI / 4);
        this.addBehavior(rotateByVelocityOutputBehavior);
        this._logicBehavior.onPhysicsEnabled.addObserver((rb) => {
            rotateByVelocityOutputBehavior.rigidbody = rb;
        });
    }
} 