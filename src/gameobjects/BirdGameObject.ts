import { GameObject, SpriteRenderBehavior, PolygonCollider, Rigidbody, Vector2, Color } from "sprunk-engine";
import { BirdLogicBehavior } from "../behaviors/flappybird/BirdLogicBehavior";
import { FlappyBirdInputBehavior } from "../behaviors/flappybird/FlappyBirdInputBehavior";
import { PolygonRenderDebugger } from "../../.lib.example/PolygonRenderDebugger.ts";

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
        
        // Add collision debug visualization
        const debugVisual = new PolygonRenderDebugger(this._collider, Color.random(0.2));
        this.addBehavior(debugVisual);
        
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
    }
    
    /**
     * Add rigidbody component to start physics simulation
     */
    public enablePhysics(): void {
        if (this._collider) {
            const rigidbody = new Rigidbody(this._collider, 0.5, 0.5);
            this.addBehavior(rigidbody);
        }
    }
    
    /**
     * Get the bird logic behavior
     */
    public getBirdLogic(): BirdLogicBehavior | null {
        return this._logicBehavior;
    }
    
    /**
     * Get the rigidbody component
     */
    public getRigidbody(): Rigidbody | null {
        return this.getFirstBehavior(Rigidbody);
    }
} 