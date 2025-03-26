import { LogicBehavior, Vector2, Inject } from "sprunk-engine";
import { FlappGameManagerLogicBehavior } from "./FlappGameManagerLogicBehavior";
import { BirdGameObject } from "../../gameobjects/BirdGameObject";

/**
 * Bird physics and behavior logic
 */
export class BirdLogicBehavior extends LogicBehavior<void> {
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    private _flapForce: number = 12;
    private _physicsEnabled: boolean = false;

    protected onEnable() {
        super.onEnable();
        this._gameManager.birdTransform = this.gameObject.transform;
    }

    /**
     * Make the bird flap upwards using physics force
     */
    public flap(): void {
        console.log("Flapping");
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
            rigidbody.addForce(new Vector2(0, 100));
        }
    }

    /**
     * Kill the bird and stop movement
     */
    public die(): void {
        this._gameManager.gameOver();
    }
} 