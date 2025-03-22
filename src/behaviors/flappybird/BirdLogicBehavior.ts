import {Inject, LogicBehavior, Vector3} from "sprunk-engine";
import {FlappGameManagerLogicBehavior} from "./FlappGameManagerLogicBehavior.ts";

/**
 * Bird physics and behavior logic
 */
export class BirdLogicBehavior extends LogicBehavior<void> {
    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;

    private _velocity: Vector3 = new Vector3(0, 0, 0);
    private _gravity: number = 9.81;
    private _flapStrength: number = 4.0;
    private _rotation: number = 0;

    protected onEnable() {
        super.onEnable();
        this._gameManager.birdTransform = this.gameObject.transform;
    }

    public tick(deltaTime: number): void {
        if(!this._gameManager.isGamePlaying()) return;
        
        // Apply gravity
        this._velocity.y -= this._gravity * deltaTime;
        
        // Apply velocity to position
        this.gameObject.transform.position.add(
            new Vector3(0, this._velocity.y * deltaTime, 0)
        );
        
        // Rotate bird based on velocity (diving down or flapping up)
        this._rotation = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, this._velocity.y * 2));
        this.gameObject.transform.rotation.setFromEulerAngles(0, 0, this._rotation);
        
        // Check if bird has hit the ground
        if (this.gameObject.transform.position.y < -4) {
            this.die();
        }
    }
    
    /**
     * Make the bird flap upwards
     */
    public flap(): void {
        this._gameManager.wantToFlap();
        if(!this._gameManager.isGamePlaying()) return;
        this._velocity.y = this._flapStrength;
    }
    
    /**
     * Kill the bird and stop movement
     */
    public die(): void {
        this._gameManager.gameOver();
        this._velocity.set(0, 0, 0);
    }
} 