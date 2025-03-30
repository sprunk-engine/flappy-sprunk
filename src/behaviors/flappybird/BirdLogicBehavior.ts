import {LogicBehavior, Vector2, Inject, PolygonCollider, Rigidbody, Event} from "sprunk-engine";
import { FlappGameManagerLogicBehavior } from "./FlappGameManagerLogicBehavior";

/**
 * Bird physics and behavior logic
 */
export class BirdLogicBehavior extends LogicBehavior<void> {
    public onPhysicsEnabled: Event<Rigidbody> = new Event();

    @Inject(FlappGameManagerLogicBehavior, true)
    private _gameManager!: FlappGameManagerLogicBehavior;
    @Inject(PolygonCollider)
    private _collider!: PolygonCollider;

    private _flapForce: number = 175;
    private _physicsEnabled: boolean = false;
    private _rigidbody: Rigidbody | null = null;

    protected onEnable() {
        super.onEnable();

        this._gameManager.birdTransform = this.gameObject.transform;

        this._collider.onDataChanged.addObserver(() =>
            this.die()
        );
    }

    public tick(): void {
        if (!this._physicsEnabled || !this._gameManager.isGamePlaying()) return;
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
            this.enablePhysics();
        }
        
        // Get rigidbody and apply force
        if (this._rigidbody) {
            this._rigidbody.linearVelocity = new Vector2(0, 0);
            this._rigidbody.addForce(new Vector2(0, this._flapForce));
            this._rigidbody.step(0.016, new Vector2(0, -9.81));
        }
    }

    /**
     * Kill the bird and stop movement
     */
    public die(): void {
        this._gameManager.gameOver();
    }

    private enablePhysics(): void {
        this._rigidbody = new Rigidbody(this._collider, 0.5, 0.5);
        this.onPhysicsEnabled.emit(this._rigidbody);
        this.gameObject.addBehavior(this._rigidbody);
    }
} 