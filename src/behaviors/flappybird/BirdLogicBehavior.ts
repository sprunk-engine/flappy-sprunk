import { LogicBehavior, Vector2, Inject } from "sprunk-engine";
import { FlappGameManagerLogicBehavior } from "./FlappGameManagerLogicBehavior";
import { BirdGameObject } from "../../gameobjects/BirdGameObject";

/**
 * Bird physics and behavior logic
 */
export class BirdLogicBehavior extends LogicBehavior<void> {
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    private _flapForce: number = 175;
    private _physicsEnabled: boolean = false;
    private static readonly MAX_ROTATION = Math.PI / 4; // 45 degrees

    protected onEnable() {
        super.onEnable();
        this._gameManager.birdTransform = this.gameObject.transform;
    }

    public tick(): void {
        if (!this._physicsEnabled || !this._gameManager.isGamePlaying()) return;

        const bird = this.gameObject as BirdGameObject;
        const rigidbody = bird.getRigidbody();

        if (rigidbody) {
            // Get current velocity
            const velocity = rigidbody.linearVelocity;
            
            // Calculate rotation based on Y velocity
            // Normalize velocity to get rotation between -45 and 45 degrees
            const rotation = Math.max(
                -BirdLogicBehavior.MAX_ROTATION,
                Math.min(BirdLogicBehavior.MAX_ROTATION, velocity.y * 0.1)
            );
            
            // Apply rotation
            this.gameObject.transform.rotation.setFromEulerAngles(0, 0, rotation);
        }
    }

    /**
     * Make the bird flap upwards using physics force
     */
    public flap(): void {
        // First notify game manager of flap attempt
        this._gameManager.wantToFlap();
        
        // If game isn't playing, don't apply forces
        if (!this._gameManager.isGamePlaying()) return;
        
        // Enable physics if this is the first flap
        if (!this._physicsEnabled) {
            this._physicsEnabled = true;
            (this.gameObject as BirdGameObject).enablePhysics();
        }
        
        // Get rigidbody and apply force
        const bird = this.gameObject as BirdGameObject;
        const rigidbody = bird.getRigidbody();
        
        if (rigidbody) {
            rigidbody.linearVelocity = new Vector2(0, 0);
            rigidbody.addForce(new Vector2(0, this._flapForce));
            rigidbody.step(0.016, new Vector2(0, -9.81));
        }
    }

    /**
     * Kill the bird and stop movement
     */
    public die(): void {
        this._gameManager.gameOver();
    }
} 